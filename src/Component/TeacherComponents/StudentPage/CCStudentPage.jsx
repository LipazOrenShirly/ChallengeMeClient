import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCChallenges from './CCChallenges';
import CCStudentDetails from './CCStudentDetails';
import './styleStudentPage.css'

class CCStudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Student: {},
            StudentChallenges: []
        }
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
                <CCChallenges studentID={student.studentID} goToEditChallenge={this.goToEditChallenge} SendDataToStudentPage={this.getDataFromChallenges} />
                <div className="col-12"><button className="btn btn-info btnYellow eddChallengeBTN" onClick={() => this.props.history.push('/StudentInfoScreen', { student: student })} >פרטי התלמיד</button></div>
                <div className="col-12"><button className="btn btn-info btnYellow eddChallengeBTN" onClick={() => this.props.history.push('/StudentFeatures', { student: student })} >אפיון התלמיד</button></div>

                <br /><br />
                <Footer />
            </div>
        );
    }
}

export default CCStudentPage;