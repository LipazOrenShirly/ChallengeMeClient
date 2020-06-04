import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import ProjectContext from '../../../Context/ProjectContext';
import localHost from '../../LittleComponents/LocalHost';
import { TiArrowBack } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';
import { AiOutlineExclamation } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import $ from 'jquery';
import { MdSend } from 'react-icons/md';
import Swal from 'sweetalert2';
import EmptyImgChallengeBase64 from '../../LittleComponents/emptyImgChallenge';

export default class CCChallengePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            StudentChallenges: [],
            statusSentence: "",
            dataImg: EmptyImgChallengeBase64,
            messageShow: false,
            firstName: null,
            lastName: null,
        };
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        this.apiUrlMessage = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        this.apiUrlTeacher = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        this.apiUrlAlert = 'http://localhost:' + { localHost }.localHost + '/api/Alert';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
            this.apiUrlMessage = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
            this.apiUrlTeacher = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';
            this.apiUrlAlert = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Alert';
            this.apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        this.btnColor();
        this.getImage();
        this.getStudentName();
    }

    getImage = () => {
        const challenge = this.props.location.state.challenge;
        fetch(this.apiUrl + '?studentID=' + challenge.studentID + '&challengeID=' + challenge.challengeID
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
                    //console.log(result);
                    this.setState({ dataImg: result })
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });
    }

    btnColor = () => {
        var status = this.props.location.state.challenge.status;
        if (status == 1) {
            $('#success').css('background-color', '#39E6C6');
            $('#fail').css('background-color', 'rgb(167, 167, 167)');
            $('#help').css('background-color', 'rgb(167, 167, 167)');
            this.setState({ statusSentence: "האתגר בוצע בהצלחה! כל הכבוד" });
        } else if (status == 2) {
            $('#success').css('background-color', 'rgb(167, 167, 167)');
            $('#fail').css('background-color', '#FD658B');
            $('#help').css('background-color', 'rgb(167, 167, 167)');
            this.setState({ statusSentence: "לא הצלחת את האתגר, נסה בכל זאת" });
        } else if (status == 3) {
            $('#success').css('background-color', 'rgb(167, 167, 167)');
            $('#fail').css('background-color', 'rgb(167, 167, 167)');
            $('#help').css('background-color', '#FFBE3D');

            this.setState({ statusSentence: "הודעה נשלחה למורה והוא יענה ברגע שיוכל" });
        }
    }

    updateStatus = (e) => {
        var id = e.currentTarget.id;
        const studentChallenge = this.props.location.state.challenge;
        if (id == 'help') {
            this.setState({ messageShow: true });
        } else this.setState({ messageShow: false });
        studentChallenge.status = (id == 'success' ? '1' : (id == 'fail' ? '2' : '3'));

        fetch(this.apiUrl + '?challengeID=' + studentChallenge.challengeID + '&studentID=' + studentChallenge.studentID + '&status=' + studentChallenge.status,
            {
                method: 'PUT',
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
                    console.log("PUT= ", result);
                    this.btnColor();
                    this.createAlert(id);
                    if (id == 'success') {
                        this.props.history.push('/StudentHomePage');
                    }
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'סטטוס האתגר לא התעדכן במערכת, חזור למסך הקודם ונסה לעדכן שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    createAlert = (statusEng) => {
        const user = this.context;
        var alertTypeID = (statusEng == 'success' ? 1 : (statusEng == 'fail' ? 2 : 3));
        var statusHeb = (alertTypeID === 1 ? 'הצליח את אתגר ' : (alertTypeID === 2 ? 'לא הצליח את אתגר ' : 'צריך עזרה באתגר '))
        const challenge = this.props.location.state.challenge;

        // ליצור התראה ולעשות לה פוסט לטבלת התראות
        const { firstName, lastName } = this.state;
        var alertTitle = 'תלמיד  ' + firstName + ' ' + lastName + ' עדכן סטטוס אתגר ';
        var alertText = 'תלמיד  ' + firstName + ' ' + lastName + ' עדכן שהוא ' + statusHeb + challenge.challengeName;

        const date = new Date();
        var minute;
        minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //שלא יהיו שעות בלי אפס בהתחלה

        var alert = {
            teacherID: user.teacherID,
            studentID: user.studentID,
            alertTitle: alertTitle,
            alertText: alertText,
            alertDate: date.toISOString().split('T')[0],
            alertTime: date.getHours() + ":" + minute,
            alertTypeID: alertTypeID
        }

        fetch(this.apiUrlAlert, {
            method: 'POST',
            body: JSON.stringify(alert),
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
                    alertTypeID === 3 && this.postAlertToFirebase(alertTitle, alertText); //שלח נוטיפיקציה רק אם לחץ צריך עזרה
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });
    }

    getStudentName = () => {
        const user = this.context;
        fetch(this.apiUrlStudent + '?studentIDGivesName=' + user.studentID
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
                    console.log("NameAndAvatarID= ", result[0]);
                    this.setState({ firstName: result[0].firstName, lastName: result[0].lastName });
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });
    }

    postAlertToFirebase = async (alertTitle, alertText) => {
        const user = await this.context;

        var teacherToken = await "";
        await fetch(this.apiUrlTeacher + '/getTeacherToken?teacherID=' + user.teacherID
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
                    console.log("TeacherToken= ", result);
                    if (result != null)
                        teacherToken = result;
                    // if (result == null)
                    // //תוקן
                    //     Swal.fire({
                    //         title: 'משהו השתבש',
                    //         text: 'ההתרעה לא נשלחה למורה',
                    //         icon: 'warning',
                    //         confirmButtonColor: '#e0819a',
                    //     });
                    // else {
                    //     teacherToken = result;
                    // }
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });

        var notification = await {
            "notification": {
                "title": alertTitle,
                "body": alertText,
                "click_action": "https://challengeme.netlify.app/",
                "icon": "http://url-to-an-icon/icon.png"
            },
            "to": teacherToken
        }
        await console.log(notification);
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

    AddPhoto = () => {
        //כאן יהיה ייבוא מהגלריה או מהמצלמה
        this.props.history.push({
            pathname: '/camera',
            state: { challenge: this.props.location.state.challenge }
        })
    }

    clickSend = () => {
        const reg = /^[\s]+$/
        if (!(reg.test(this.state.messageText) || this.state.messageText == "")) {
            this.sendMessage();
            this.setState({ messageText: "" });
        }
    }

    sendMessage = () => {
        const user = this.context;
        const date = new Date();
        var minute = "";
        minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //שלא יהיו שעות בלי אפס בהתחלה
        var messageS = "<strong> " + this.state.firstName + " " + this.state.lastName + " צריך עזרה באתגר " + this.props.location.state.challenge.challengeName + ": </strong><br/>" + this.state.messageText;
        console.log(messageS);
        const message = {
            teacherID: user.teacherID,
            studentID: user.studentID,
            messageTitle: "",
            messageText: messageS,
            messageDate: date.toISOString().split('T')[0],
            messageTime: date.getHours() + ":" + minute,
            messageByTeacher: false,
        }

        fetch(this.apiUrlMessage, {
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
                    this.setState({ messageShow: false })
                    //תוקן
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'ההודעה נשלחה בהצלחה',
                        icon: 'success',
                        confirmButtonColor: 'rgb(135, 181, 189)',
                    });
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'ההודעה לא נשלחה, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    render() {
        const user = this.context;
        const challenge = this.props.location.state.challenge;
        const deadline = new Date(challenge.deadline);
        const today = new Date();
        const dateDiff = parseInt((deadline - today) / (1000 * 60 * 60 * 24), 10);
        const messageHelp = "סימנת שאתה זקוק לעזרה, הודעה נשלחת אוטומטית למחנך, יש לך אופציה לרשום לו הודעה עם הסבר על הבעיה";
        const dateLeft = dateDiff > 30 ?
            <div> <div className="col-12 dedlineTextChallengePage">מועד סיום האתגר</div>
                <div className="col-12 dedlineDateTextChallengePage">{challenge.deadline}</div></div>
            : <div className="col-12 dedlineDateTextChallengePage">נותרו {dateDiff} ימים <br />לסיום האתגר</div>
        return (
            <div className="studentPage">
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <br />
                {/* תמונת האתגר */}
                <div className="row mp0 justify-content-center" style={{ backgroundColor: 'black' }}>
                    <img className="imageOneChallenge" src={`data:image/jpeg;base64,${this.state.dataImg}`} />

                </div>
                <div className="row mp0">
                    <FaPencilAlt className="FaPencilAlt" size={35} onClick={this.AddPhoto} color="white" />
                </div>
                {/* מספר האתגר */}
                <div className="challengeReadText" style={{ marginTop: '2%' }}>אתגר מספר {this.props.location.state.index + 1}</div>
                {/* תאור האתגר */}
                <div className="col-12 challengeReadText challengeName">{challenge.challengeName} </div>
                {/* ימים לסיום אתגר/תאריך סיום */}
                {
                    challenge.status == 1 || challenge.status == 3 ? (<div className="statusSentence">{this.state.messageShow == true ? messageHelp : this.state.statusSentence}</div>) :
                        challenge.status == 2 ? <div><div className="statusSentence">{this.state.statusSentence}</div> {dateLeft} </div> : { dateLeft }

                }
                <br />
                {
                    this.state.messageShow &&

                    <div className="input-group mb-3 mp0">
                        <div className="input-group-prepend mp0">
                            <button className="input-group-text sendBackGround" id='send' onClick={this.clickSend}><MdSend className="MdSend" color='rgb(163,233,255)' /></button>
                        </div>
                        <input type="text" className="form-control inputNewTeacher" id='messageText' placeholder='כתוב הודעה'
                            value={this.state.messageText} onChange={(e) => {
                                this.setState({ messageText: e.target.value });
                            }}
                        />
                    </div>



                }
                <br />
                {/* כפתורי סטטוס אתגר */}
                <div className="row mp0 d-flex justify-content-around" style={{ padding: '0px' }}>
                    <div className="col-4" style={{ padding: '0px' }}>
                        <div className="col-12">
                            <button className="btn btn-info btnFail Stat2" id='fail' onClick={this.updateStatus} ><MdClose size={50} /></button>
                        </div>
                        <div className="col-12 textSeccesNotOrHelp" >לא הצלחתי</div>
                    </div>
                    <div className="col-4" style={{ padding: '0px' }}>
                        <div className="col-12">
                            <button className="btn btn-info btnHelp Stat3" id='help' onClick={this.updateStatus} ><AiOutlineExclamation size={50} /></button>
                        </div>
                        <div className="col-12 textSeccesNotOrHelp" >צריך עזרה</div>
                    </div>
                    <div className="col-4" style={{ padding: '0px' }}>
                        <div className="col-12">
                            <button className="btn btn-info btnSuccess Stat1" id='success' onClick={this.updateStatus} ><MdCheck size={50} /></button>
                        </div>
                        <div className="col-12 textSeccesNotOrHelp" >הצלחתי</div>
                    </div>
                </div>
            </div>
        )
    };
}

