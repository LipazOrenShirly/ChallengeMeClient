import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import Challenges from './Challenges';
import StudentDetails from './StudentDetails';
import EditChallenge from './EditChallenge';
import './styleStudentPage.css'

class StudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Student: {},
            StudentChallenges: []
        }
    }

    goToEditChallenge=(challenge)=>{
        this.props.history.push({
            pathname:'/EditChallenge',
             state:{challenge: challenge}
        })   
    }

    render() {
        const student = this.props.location.state.student;
        return (
            <div>
                <NavBar /><br />
                <StudentDetails student = {student} />
                <Challenges studentID = {student.studentID} goToEditChallenge = {this.goToEditChallenge} />
                <div className="col-12"><button className="btn btn-info btnYellow" onClick = { ()=> this.props.history.push('/StudentInfoScreen', {student: student} ) } >עדכון אפיון תלמיד</button></div>
                <br /><br />
                <Footer />
            </div>
        );
    }
}

export default StudentPage;