import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import { TiArrowBack } from 'react-icons/ti';
import CCOneMessage from './CCOneMessage';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import { MdSend } from 'react-icons/md';
import Swal from 'sweetalert2';



export default class CCChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesArr: [],
            messageText: "",
            newMessage: "",
            sendDisabled: '',
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        this.getMessages();
        this.changeAllMessageToRead();
        setInterval(this.getMessages, 5000);//כל 5 שניות בודק אם יש הודעות חדשות
    }

    getMessages = () => {
        const user = this.context;
        fetch(this.apiUrl + '?teacherID= ' + user.teacherID + '&studentID=' + this.props.location.state.student.studentID
            , {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                console.log('res=', res);
                console.log('res.status', res.status);
                console.log('res.ok', res.ok);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("messagesArr= ", result);
                    this.setState({ messagesArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    changeAllMessageToRead = () => {
        const user = this.context;
        fetch(this.apiUrl + '?teacherID= ' + user.teacherID + '&studentID=' + this.props.location.state.student.studentID, {
            method: 'PUT',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch PUT= ", result);
                },
                (error) => {
                    console.log("err post=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    sendMessage = () => {
        const user = this.context;
        const date = new Date();

        const message = {
            teacherID: user.teacherID,
            studentID: this.props.location.state.student.studentID,
            messageTitle: "",
            messageText: this.state.messageText,
            messageDate: date.toISOString().split('T')[0],
            messageTime: date.getHours() + ":" + date.getMinutes(),
            messageByTeacher: true,
        }

        fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(message),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                    this.getMessages();
                },
                (error) => {
                    console.log("err post=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }
    clickSend = async () => {

        const reg = await /^[\s]+$/
        if (!(reg.test(this.state.messageText) || this.state.messageText == "")) {
            await this.sendMessage();
            await this.sendNotificationToStudent();
            await this.setState({ messageText: "" });
        }
    }

    sendNotificationToStudent = async () => {
        const user = this.context;
        var StudentToken = await '';
        await fetch(this.apiUrlTeacher + '/getStudentToken?studentID=' + this.props.location.state.student.studentID
            , {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                console.log('res=', res);
                console.log('res.status', res.status);
                console.log('res.ok', res.ok);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("student= ", result);
                    if (result == null)
                        Swal.fire({
                            title: 'אוי',
                            text: 'הפעולה נכשלה, נסה שנית',
                            icon: 'warning',
                            confirmButtonColor: '#e0819a',
                        });
                    else {
                        StudentToken = result;
                    }
                },
                (error) => {
                    console.log("err get=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });

                
        var alertTitle = "המורה שלח לך הודעה";
        var alertText = this.state.messageText;

        // לעשות פוסט לפיירבייס
        var notification = await {
            "notification": {
                "title": alertTitle,
                "body": alertText,
                "click_action": "https://challengeme.netlify.app/",
                "icon": "http://url-to-an-icon/icon.png"
            },
            "to": StudentToken
        }
        await fetch("https://fcm.googleapis.com/fcm/send", {
            method: 'POST',
            body: JSON.stringify(notification),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'key=AAAAB9pd-t0:APA91bFqlbdOGpqVbNifFlo-_2p9uPFoFqqi0iY5O-_bFjMuzYgVlxC7uC9xRQEprfEqdiDjsNEremg7RWBHlyMQhlhC1Hxo_ZPUsjCYTPUS3nu4cMQJ3tXhUImmftNhg3TPjlN1Wq1G'
            })
        })
            .then(res => {
                console.log('res=', res);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    goToHomePageStudent = () => {
        var s = this.props.location.state.student;
        this.props.history.push({
            pathname: '/StudentPage',
            state: { student: s }
        })
    }
    render() {
        const messageText = this.state.messageText;
        return (
            <div className="container-fluid">
                <NavBar></NavBar>

                <div className="row upChatT mp0 align-items-center"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                    <div className="nameGoToHomeS" onClick={this.goToHomePageStudent}>{this.props.location.state.student.firstName} {this.props.location.state.student.lastName}</div>

                </div>
                <div className='messagesDivT'>
                    {this.state.messagesArr.map((item, index, array) => {
                        var prevDate = index != array.length - 1 ? array[index + 1].messageDate : '';
                        var currDate = item.messageDate;
                        var diffDate = index == array.length - 1 ? true : (prevDate != currDate ? true : false);
                        return <CCOneMessage message={item} key={item.messageID} dateTitle={diffDate} />
                    }
                    )}
                </div>
                {/* <div className="form-group col-12">
                    <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'messageText',
                            type: 'text',
                            placeholder: 'כתוב הודעה',
                            className: "form-control inputNewTeacher"
                        }}
                        value={messageText}
                        onChange={(messageText, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ messageText });
                            this.setState({ sendDisabled: e.target.value });
                        }}
                    />
                </div> */}

                {/* <button id='send' disabled={!this.state.sendDisabled} onClick={() => {this.sendMessage(); this.setState({messageText:""});}}>שלח</button> */}

                <div className="input-group mb-3 mp0 sendMesInputDivT">
                    <div className="input-group-prepend mp0">
                        <button className="input-group-text sendBackGroundTeacher" id='send' onClick={this.clickSend}><MdSend className="MdSendT" color='#E8D5D5' /></button>
                    </div>
                    <input type="text" className="form-control inputNewTeacher" id='messageText' placeholder='כתוב הודעה'
                        value={messageText} onChange={(e) => {
                            this.setState({ messageText: e.target.value });
                        }}
                    />

                </div>
                <Footer></Footer>

            </div>
        );
    };
}



