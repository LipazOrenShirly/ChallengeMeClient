import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import Challenges from './Challenges';
import StudentDetails from './StudentDetails';
import EditChallenge from './EditChallenge';

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
                <NavBar /><br /><br />
                <StudentDetails student = {student} /><br /><br />
                <Challenges studentID = {student.studentID} goToEditChallenge = {this.goToEditChallenge} />
                <button onClick = { ()=> this.props.history.push('/StudentInfoScreen', {student} ) } >עדכון אפיון תלמיד</button>
                <Footer />
            </div>
        );
    }
}

export default StudentPage;