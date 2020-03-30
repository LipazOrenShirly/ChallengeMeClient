import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css';
import CCStudents from './CCStudents';
import localHost from '../../LittleComponents/LocalHost';
import { FaTrashAlt } from "react-icons/fa";

export default class CCOneStudent extends Component {
    constructor(props) {
        super(props);
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    DeleteStudent = () => {
        fetch(this.apiUrl + '?studentID=' + this.props.student.studentID, {
            method: 'DELETE',
            headers: new Headers({
                'accept': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch DELETE= ", result);
                },
                (error) => {
                    console.log("err post=", error);
                })
            .then(
                window.location.reload());
    }

    render() {
        return (

            <div className="classNameHome col-2" >
                <div className="iconDiv" onClick={this.DeleteStudent}><FaTrashAlt /></div>
                <span className="verticalMiddle" onClick={() => this.props.SendDataToStudents(this.props.student)}>
                    {this.props.student.firstName}
                </span>
            </div>
        );
    };
}