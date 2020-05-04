import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCChallenges from './CCChallenges';
import CCStudentDetails from './CCStudentDetails';
import './styleStudentPage.css'
import localHost from '../../LittleComponents/LocalHost';
import { NavLink, Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { MdMail } from "react-icons/md";
import ProjectContext from '../../../Context/ProjectContext';

class CCStudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Student: {},
            StudentChallenges: [],
            hasFeature: false,
            UnReadMesgCount: null,
        }
        let local = false;
        this.apiUrlStudentFeatures = 'http://localhost:' + { localHost }.localHost + '/api/StudentFeatures';
        this.apiUrlMessage = 'http://localhost:' + { localHost }.localHost + '/api/Message';

        if (!local) {
            this.apiUrlStudentFeatures = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentFeatures';
            this.apiUrlMessage = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
        var studentID = this.props.location.state.student.studentID;
        this.getMessagesCount();
        setInterval(this.getMessagesCount, 5000); // runs every 5 seconds.

        // בדיקה האם המורה כבר מילא את האפיון של התלמיד
        fetch(this.apiUrlStudentFeatures + '?studentID=' + studentID
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
                    console.log("Featerus= ");
                    console.log(result);
                    this.setState({ hasFeature: result.length == 0 ? false : true });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    getMessagesCount = () => {
        const user = this.context;
        var studentID = this.props.location.state.student.studentID;
        // פונקציה שמחזירה כמה הודעות שלא נקראו יש מהתלמיד
        fetch(this.apiUrlMessage + '?getter_teacherID=' + user.teacherID + '&sender_studentID=' + studentID
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
                    console.log("studentsArr= ", result);
                    this.setState({ UnReadMesgCount: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    goToEditChallenge = (challenge) => {
        this.props.history.push({
            pathname: '/EditChallenge',
            state: {
                challenge: challenge,
                student: this.props.location.state.student
            }
        })
    }
    getDataFromChallenges = (studentID, StudentChallenges) => {
        this.props.history.push({
            pathname: '/AddChallengeToStudent',
            state: { studentID: studentID, StudentChallenges: StudentChallenges }
        })
    }

    goToChat = (student) => {
        this.props.history.push({
            pathname: '/Chat',
            state: { student: student }
        })
    }

    render() {
        const student = this.props.location.state.student;
        console.log("dddddd");
        console.log(student);
        return (
            <div>
                <NavBar /><br />
                {/* <CCStudentDetails student = {student} /> */}

                <div className="linkColor">
                    <Badge badgeContent={this.state.UnReadMesgCount} color="secondary" onClick={() => this.goToChat(student)}>
                        <MdMail size={40} />
                    </Badge>
                </div>
                <div>
                    <p className="textStudentDetails"> התלמיד <strong>{student.firstName} {student.lastName}</strong></p>
                </div>
                {this.state.hasFeature &&
                    <CCChallenges studentID={student.studentID} goToEditChallenge={this.goToEditChallenge} SendDataToStudentPage={this.getDataFromChallenges} />
                }
                {this.state.hasFeature == false &&
                    <div className="errorfeature">על מנת להוסיף אתגרים לתלמיד עליך להשלים את אפיון התלמיד</div>
                }
                <div className="col-12"><button className="btn btn-info btnPink eddChallengeBTN" onClick={() => this.props.history.push('/StudentFeatures', { student: student })} >אפיון התלמיד</button></div>

                <div className="col-12"><button className="btn btn-info btnPink eddChallengeBTN" onClick={() => this.props.history.push('/StudentInfoScreen', { student: student })} >פרטי התלמיד</button></div>

                <br /><br />
                <Footer />
            </div>
        );
    }
}

export default CCStudentPage;