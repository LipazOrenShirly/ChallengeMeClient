import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css';
import CCStudents from './CCStudents';
import localHost from '../../LittleComponents/LocalHost';
import { FaTrashAlt } from "react-icons/fa";


export default class CCOneClass extends Component {
    constructor(props) {
        super(props);
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    DeleteClass = () => {
        fetch(this.apiUrl + '?classID=' + this.props.class.classID, {
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
                });
        window.location.reload();
    }

    studentsPage = () => {
        this.props.SendDataToClasses(this.props.class);
    }
    render() {
        return (
            <div className="classNameHome col-2" >
                <div className="iconDiv" onClick={this.DeleteClass}><FaTrashAlt /></div>
                <span className="verticalMiddle" onClick={this.studentsPage}>{this.props.class.className}</span>
            </div>
        );
    };
}