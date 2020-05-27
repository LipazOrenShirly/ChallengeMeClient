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
import EmptyImgStudentBase64 from '../../LittleComponents/emptyImgStudent';
import ProjectContext from '../../../Context/ProjectContext';
import Swal from 'sweetalert2';


class CCStudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Student: {},
            StudentChallenges: [],
            hasFeature: false,
            UnReadMesgCount: null,
            dataImg: EmptyImgStudentBase64,
        }
        let local = false;
        this.apiUrlStudentFeatures = 'http://localhost:' + { localHost }.localHost + '/api/StudentFeatures';
        this.apiUrlMessage = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';

        if (!local) {
            this.apiUrlStudentFeatures = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentFeatures';
            this.apiUrlMessage = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
            this.apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';

        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
        var studentID = this.props.location.state.student.studentID;
        this.getMessagesCount();
        setInterval(this.getMessagesCount, 5000); // runs every 5 seconds.
        this.getImage(studentID);
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
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
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    getImage = (studentID) => {

        fetch(this.apiUrlStudent + '/ImageStudent?studentID=' + studentID
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("studentsArr= ", result);
                    this.setState({ UnReadMesgCount: result });
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
                <NavBar />
                <br />

                <div className="row mp0" >
                    <div className="linkColor col-3 d-flex align-items-center justify-content-center">
                        <Badge badgeContent={this.state.UnReadMesgCount} color="secondary" onClick={() => this.goToChat(student)}>
                            <MdMail size={40} />
                        </Badge>
                    </div>
                    <div className="headLineStudentPage col-9">
                        <div className="row mp0" dir="rtl">
                            <img className="emptyUserImg" src={`data:image/jpeg;base64,${this.state.dataImg}`} />
                            <div className="textStudentDetails col-8" style={{ width: '100%', paddingTop: '5%' }} ><strong>{student.firstName} {student.lastName}</strong></div>
                        </div>
                    </div>

                </div>
                <br />
                <div className="row mp0">
                    <div className="col-6" style={{paddingRight:'2px'}}><button className="btn btn-info btnPink eddChallengeBTN" onClick={() => this.props.history.push('/StudentFeatures', { student: student })} >אפיון התלמיד</button></div>
                    <div className="col-6" style={{paddingLeft:'2px'}}><button className="btn btn-info btnPink eddChallengeBTN" onClick={() => this.props.history.push('/StudentInfoScreen', { student: student })} >פרטי התלמיד</button></div>
                </div>
                {this.state.hasFeature &&
                    <CCChallenges studentID={student.studentID} goToEditChallenge={this.goToEditChallenge} SendDataToStudentPage={this.getDataFromChallenges} />
                }
                {this.state.hasFeature == false &&
                    <div className="errorfeature">על מנת להוסיף אתגרים לתלמיד עליך להשלים את אפיון התלמיד</div>
                }

                <br /><br />
                <Footer />
            </div>
        );
    }
}

export default CCStudentPage;