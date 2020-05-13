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
        };
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        this.apiUrlMessage = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
            this.apiUrlMessage = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        this.btnColor();
        this.getImage();
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
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })
            .then(() => {

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

            this.setState({ statusSentence: "סימנת שאתה זקוק לעזרה, הודעה נשלחת אוטומטית למחנך, יש לך אופציה לרשום לו הודעה עם הסבר על הבעיה" });
        }
    }

    updateStatus = (e) => {
        var id = e.currentTarget.id;
        const studentChallenge = this.props.location.state.challenge;
        if (id == 'help') {
            this.setState({ messageShow: true });
        }
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

        const message = {
            teacherID: user.teacherID,
            studentID: user.studentID,
            messageTitle: "",
            messageText: this.state.messageText,
            messageDate: date.toISOString().split('T')[0],
            messageTime: date.getHours() + ":" + date.getMinutes(),
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
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'ההודעה נשלחה בהצלחה',
                        icon: 'success',
                        confirmButtonColor: 'rgb(135, 181, 189)',
                    });
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

    render() {
        const user = this.context;
        const challenge = this.props.location.state.challenge;
        const deadline = new Date(challenge.deadline);
        const today = new Date();
        const dateDiff = parseInt((deadline - today) / (1000 * 60 * 60 * 24), 10);

        return (
            <div className="studentPage">
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <br />
                {/* תמונת האתגר */}
                <div className="row mp0">
                    <img className="imageOneChallenge" src={`data:image/jpeg;base64,${this.state.dataImg}`} />
                    <FaPencilAlt className="FaPencilAlt" onClick={this.AddPhoto} />
                </div>
                {/* מספר האתגר */}
                <div className="challengeReadText" style={{ marginTop: '2%' }}>אתגר מספר {this.props.location.state.index + 1}</div>
                {/* תאור האתגר */}
                <div className="col-12 challengeReadText challengeName">{challenge.challengeName} </div>
                {/* ימים לסיום אתגר/תאריך סיום */}
                {
                    challenge.status != 0 ? <div className="statusSentence">{this.state.statusSentence}</div> :
                        dateDiff > 30 ?
                            <div> <div className="col-12 dedlineTextChallengePage">מועד סיום האתגר</div>
                                <div className="col-12 dedlineDateTextChallengePage">{challenge.deadline}</div></div>
                            : <div className="col-12 dedlineDateTextChallengePage">נותרו {dateDiff} ימים <br />לסיום האתגר</div>
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

