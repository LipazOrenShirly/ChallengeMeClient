import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import { TiArrowBack } from 'react-icons/ti';
import OneMessage from './CCOneMessage';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesArr: [],
            messageText: "",
            newMessage: ""
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        this.getMessages();
    }

    getMessages = () => {
        const user = this.context;
        fetch(this.apiUrl + '?teacherID= '+ user.teacherID+ '&studentID=' + this.props.location.state.student.studentID
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
                return res.json();
            })
            .then(
                (result) => {
                    console.log("messagesArr= ", result);
                    this.setState({ messagesArr: result });
                    this.changeAllMessageToRead();
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    changeAllMessageToRead = () => {
        const user = this.context;
        fetch(this.apiUrl+'?teacherID= '+ user.teacherID + '&studentID=' + this.props.location.state.student.studentID, {
            method: 'PUT',
            headers: new Headers({
              'Content-type': 'application/json; charset=UTF-8' 
            })
          })
            .then(res => {
              console.log('res=', res);
              return res.json()
            })
            .then(
              (result) => {
                console.log("fetch PUT= ", result);
              },
              (error) => {
                console.log("err post=", error);
              });
    }

    sendMessage = () => {
        const user = this.context;

        const message = {
            teacherID: user.teacherID,
            studentID: this.props.location.state.student.studentID,
            messageTitle: "",
            messageText: this.state.messageText,
            messageDate: new Date(),
            messageTime: new Date(),
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
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                    this.getMessages();
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    render() {
        const messageText = this.state.messageText;
        return (
            <div className="container-fluid">
                <NavBar></NavBar>

                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                {this.state.messagesArr.map((item) =>
                    <OneMessage message={item} key={item.messageID} onClick={() => this.props.goToChat(item)} />
                )}

                <div className="form-group col-12">
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
                            console.log(e);
                        }}
                    />
                </div>

                <button onClick={() => this.sendMessage()}>שלח</button>

                <Footer></Footer>

            </div>
        );
    };
}



