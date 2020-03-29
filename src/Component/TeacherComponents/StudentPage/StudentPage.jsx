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
        const studentID = 21;
        return (
            <div>
                <NavBar /><br /><br />
                <StudentDetails studentID = {studentID} />
                <Challenges studentID = {studentID} goToEditChallenge = {this.goToEditChallenge} />
                <button onClick = { ()=> this.props.history.push('/StudentInfoScreen'+studentID) } >עדכון אפיון תלמיד</button>
                <Footer />
            </div>
        );
    }
}

export default StudentPage;