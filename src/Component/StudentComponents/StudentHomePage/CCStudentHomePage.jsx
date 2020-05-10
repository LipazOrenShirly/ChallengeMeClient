import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudentHomePage.css';
import ProjectContext from '../../../Context/ProjectContext';
import CCStudentChallenges from './CCStudentChallenges';
import localHost from '../../LittleComponents/LocalHost';
import "animate.css";
import Resizer from 'react-image-file-resizer';
import { RiLogoutBoxLine } from 'react-icons/ri';
import EmptyImgStudentBase64 from '../../LittleComponents/emptyImgStudent';

export default class CCStudentHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countMessages: 0,
            FirstAndLastName: { firstName: "", lastName: "" },
            Avatar: null,
            avatarSentances: ["!המשך כך", "!אתה מסוגל", "!תעבור עוד אתגרים כדי שאוכל לגדול", "!אתה תותח"],
            SuccessCount: 0,
            ChallengesCount: 0,
            SuccessRatio: 0,
            dataUriImageStudent: "",
            dataImg: EmptyImgStudentBase64

        };
        let local = true;
        this.apiUrlMessage = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrlMessage = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
            this.apiUrlStudent = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
        this.getFiles = this.getFiles.bind(this);

    }

    static contextType = ProjectContext;

    componentDidMount() {
        this.getImage();
        this.getNameAndAvatarNum();
        this.getSuccessCount();
        this.getDataOfMessagesNum();
        setInterval(this.getDataOfMessagesNum, 5000); // runs every 5 seconds.
    }

    goToChallengePage = (challenge, index) => {
        this.props.history.push({
            pathname: '/ChallengePage',
            state: { challenge: challenge, index: index }
        })
    }
    
    getImage = () => {
        const user = this.context;
        fetch(this.apiUrlStudent + '/ImageStudent?studentID=' + user.studentID
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
                    //console.log(result);
                    this.setState({ dataImg: result })
                },
                (error) => {
                    console.log("err get=", error);
                })
            .then(() => {

            });
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
                    this.setState({ FirstAndLastName: { firstName: result[0].firstName, lastName: result[0].lastName }, Avatar: result[0].avatar });
                    if (result[0].avatar == null)
                        this.props.history.push('/ChooseAvatar')
                },
                (error) => {
                    console.log("err get=", error);
                });
    }
    getSuccessCount = () => {
        const user = this.context;
        console.log(user.studentID);
        fetch(this.apiUrlStudent + '/SuccessCount?studentID=' + user.studentID
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
                    console.log("count= ", result);
                    this.setState({ 
                        SuccessCount: result[0], 
                        ChallengesCount: result[1],
                        SuccessRatio: result[0] / result[1] * 100  
                    });
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
                    if (result > 0 && this.state.countMessages !== result)
                        this.setState({ countMessages: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }
    getFiles = (e) => {
        var fileInput = false;
        if (e.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {

            Resizer.imageFileResizer(
                e.target.files[0], //is the file of the new image that can now be uploaded...
                300, // is the maxWidth of the  new image
                300, // is the maxHeight of the  new image
                'PNG', // is the compressFormat of the  new image
                50, // is the quality of the  new image
                0, // is the rotatoion of the  new image
                uri => { this.saveImg(uri); },  // is the callBack function of the new image URI
                'base64'  // is the output type of the new image
            );

        }
        // 
        // console.log(this.state.dataUriImage)

    }
    saveImg = (uri) => {
        this.setState({ dataUriImageStudent: uri });
        console.log(uri)
        const user = this.context;
        var data = {
            image: uri,
            studentID: user.studentID,
        }
        fetch(this.apiUrlStudent + "/AddImgStudent"
            , {
                method: 'PUT',
                body: JSON.stringify(data),
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
                    this.getImage();
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    render() {
        const user = this.context;
        var RandomNumber = Math.floor(Math.random() * this.state.avatarSentances.length) + 0;
        const { SuccessCount } = this.state;
        var avatarLevel = SuccessCount > 4 ? 5 : SuccessCount + 1;
        return (
            <div className="studentPage">
                <div className="d-flex justify-content-start" style={{ padding: '2% 0 0 2%', color: 'rgb(46, 46, 124)' }}
                        onClick={() => { sessionStorage.clear(); localStorage.clear(); this.props.history.push('/'); }}>
                    <RiLogoutBoxLine color='rgb(46, 46, 124)' size={25} style={{ marginRight: '2%' }} /> התנתק
                </div>
                {/* פרטי התלמיד */}
                <div className="headLineHomePage row" dir="rtl">
                    <input type="file" id="fileImgStudent" onChange={this.getFiles} />
                    <label for="fileImgStudent" className="lableImg">
                        <img className="emptyUserImg" style={{ margin: '5px' }} src={`data:image/jpeg;base64,${this.state.dataImg}`} />
                    </label>
                    <div className="helloName"> היי {this.state.FirstAndLastName.firstName} {this.state.FirstAndLastName.lastName},</div>
                </div>
                <br />
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
                {
                    this.state.Avatar != null &&
                    <div className="row" style={{ margin: '0px', marginTop: '2%', padding: '0px' }}>
                        <div className="animated bounce infinite col-4 avatarClassDiv" > <img src={require('../../../img/avatars/' + this.state.Avatar + '/' + this.state.Avatar + avatarLevel + '.png')} /></div>
                        <div className="animated fadeIn delay-1s col-6" id="talkbubble">{this.state.avatarSentances[RandomNumber]}</div>
                    </div>
                }

            </div>
        )
    };
}

