import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudentHomePage.css';
import ProjectContext from '../../../Context/ProjectContext';
import CCStudentChallenges from './CCStudentChallenges';
import localHost from '../../LittleComponents/LocalHost';
import "animate.css";
export default class CCStudentHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countMessages: null,
            FirstAndLastName: { firstName: "", lastName: "" },
            AvatarID: null,
            avatarSentances: ["!המשך כך", "!אתה מסוגל", "!תעבור עוד אתגרים כדי שאוכל לגדול", "!אתה תותח"]
        };
        let local = true;
        this.apiUrlMessage = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrlMessage = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
            this.apiUrlStudent = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    goToChallengePage = (challenge, index) => {
        this.props.history.push({
            pathname: '/ChallengePage',
            state: { challenge: challenge, index: index }
        })
    }

    componentDidMount = () => {
        this.getNameAndAvatarNum();
        this.getDataOfMessagesNum();
        setInterval(this.getDataOfMessagesNum, 5000); // runs every 5 seconds.
    }
    getNameAndAvatarNum = () => {
        const user = this.context;
        console.log(user.studentID);
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
                return res.json();
            })
            .then(
                (result) => {
                    console.log("NameAndAvatarID= ", result[0]);
                    this.setState({ FirstAndLastName: { firstName: result[0].firstName, lastName: result[0].lastName }, AvatarID: result[0].avatarID });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    getDataOfMessagesNum = () => {// runs every 30 seconds  משיכה של מספר ההודעה שלא נקראו

        const user = this.context;
        fetch(this.apiUrlMessage + '?studentID_UnRead=' + user.studentID
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
                    console.log("countMessages= ", result);
                    this.setState({ countMessages: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {
        const user = this.context;
        var RandomNumber = Math.floor(Math.random() * this.state.avatarSentances.length) + 0;

        return (
            <div className="container-fluid studentPage">
                <br />
                {/* פרטי התלמיד */}
                <div className="headLineHomePage row col-12" dir="rtl">
                    <img className="emptyUserImg" src={require('../../../img/emptyUserImg.png')} />
                    <div className="helloName"> היי {this.state.FirstAndLastName.firstName} {this.state.FirstAndLastName.lastName},</div>
                </div>
                {/* הודעות של התלמיד */}
                <div onClick={() => this.props.history.push('/StudentChat')} className="messagesS col-12 d-flex align-items-center justify-content-center" >
                    <div>
                        <div className="btnMassagesReadText"> יש לך {this.state.countMessages} הודעות חדשות</div>
                        <div ><button className="btn btn-info btnYellow roundedBtn btnMassagesRead">לקריאה לחץ כאן</button></div>
                    </div>
                </div>

                {/* האתגרים של התלמיד */}
                <CCStudentChallenges goToChallengePage={this.goToChallengePage} />

                {/* אווטאר */}
                <div className="row" style={{ marginTop: '2%' }}>
                    <div className="animated bounce infinite col-4 avatarClassDiv" > <img src={require('../../../img/avatars/pinguin/p3.png')} /></div>
                    <div className="animated fadeIn delay-1s col-6" id="talkbubble">{this.state.avatarSentances[RandomNumber]}</div>
                </div>
            </div>
        )
    };
}

