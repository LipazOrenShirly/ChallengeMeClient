import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';

export default class CCOneStudentsWithMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            UnReadCount: null,
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
            this.apiUrlStudent = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
        fetch(this.apiUrlStudent + '?studentID=' + this.props.studentID
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
                    console.log("student= ", result[0]);
                    this.setState({ student: result[0] });
                    this.getUnReadAmount();
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    getUnReadAmount = () => {
        const user = this.context;
        // פונקציה שמחזירה כמה הודעות שלא נקראו יש מהתלמיד
        fetch(this.apiUrl + '?getter_teacherID=' + user.teacherID + '&sender_studentID=' + this.state.student.studentID
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
                    this.setState({ UnReadCount: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {
    
        return (
            <div onClick = { () => this.props.goToChat(this.state.student)}>
                {this.state.student.firstName} {this.state.student.lastName}
                <div>{this.state.UnReadCount}</div>  {/* להציג איכשהו כמה הודעות שלא נקראו יש מהתלמיד */}
                
            </div>
        );
    };
}



