import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCChallenges from './CCChallenges';
import CCStudentDetails from './CCStudentDetails';
import './styleStudentPage.css'
import localHost from '../../LittleComponents/LocalHost';

class CCStudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Student: {},
            StudentChallenges: [],
            hasFeature: false
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentFeatures';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod'+ '/api/StudentFeatures';
        }
      
    }

    componentDidMount() {
        fetch(this.apiUrl + '?studentID=' + this.props.location.state.student.studentID
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

    goToEditChallenge = (challenge) => {
        this.props.history.push({
            pathname: '/EditChallenge',
            state: {
                challenge: challenge,
                student: this.props.location.state.student
            }
        })
    }
    getDataFromChallenges = (studentID) => {
        this.props.history.push({
            pathname: '/AddChallengeToStudent',
            state: { studentID: studentID }
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
                <div>
                    <p className="textStudentDetails"> התלמיד <strong>{student.firstName} {student.lastName}</strong></p>
                </div>
                {this.state.hasFeature &&
                    <CCChallenges studentID={student.studentID} goToEditChallenge={this.goToEditChallenge} SendDataToStudentPage={this.getDataFromChallenges} />
                }
                {this.state.hasFeature == false &&
                    <div className="errorfeature">על מנת להוסיף אתגרים לתלמיד עליך להשלים את אפיון התלמיד</div>
                }
                <div className="col-12"><button className="btn btn-info btnYellow eddChallengeBTN" onClick={() => this.props.history.push('/StudentFeatures', { student: student })} >אפיון התלמיד</button></div>

                <div className="col-12"><button className="btn btn-info btnYellow eddChallengeBTN" onClick={() => this.props.history.push('/StudentInfoScreen', { student: student })} >פרטי התלמיד</button></div>

                <br /><br />
                <Footer />
            </div>
        );
    }
}

export default CCStudentPage;