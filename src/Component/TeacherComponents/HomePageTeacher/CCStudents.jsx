import React, { Component } from 'react';
import HorizontalScroller from 'react-horizontal-scroll-container';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCOneStudent from './CCOneStudent';
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';
import localHost from '../../LittleComponents/LocalHost';
import { MdCreate } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

import $ from 'jquery';

export default class CCStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Class: this.props.class,
            StudentArr: []
        };
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod'+ '/api/Student';
        }
    }
    
     componentDidMount = () => {
        $('#BTNsaveClassName').hide();
        $('#className').val(this.state.Class.className);
        this.getStudentArr();
     
    }
    getStudentArr=()=>{
        fetch(this.apiUrl + '?classID=' + this.state.Class.classID
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
                console.log("StudentArr= ", result);
                this.setState({ StudentArr: result })
            },
            (error) => {
                console.log("err get=", error);
            });
    }
    EditClassName = () => { 
        $('#className').prop("disabled", false);
        $('#BTNeditClassName').hide();
        $('#BTNsaveClassName').show();
    }
    AddStudent=()=>{
        this.props.SendtoStudents(this.props.class.classID);

    }
    UpdateClassName = () => {
        var updatedClass = {
            className: $('#className').val(),
            classID: this.state.Class.classID,
            teacherID: this.state.Class.teacherID
        }

        var apiUrlClass = 'http://localhost:' + { localHost }.localHost + '/api/Class'
        fetch(apiUrlClass, {
            method: 'PUT',
            body: JSON.stringify(updatedClass),
            headers: new Headers({
              'Content-type': 'application/json; charset=UTF-8' 
            })
          })
            .then(res => {
              console.log('res=', res);
              return res.json()
            })
            .then(
              (result) => {
                console.log("fetch PUT= ", result);
              },
              (error) => {
                console.log("err post=", error);
              });
              $('#BTNsaveClassName').hide();
              $('#BTNeditClassName').show();
              $('#className').prop("disabled", true);
    }

    deleteStudent=(studentIdData)=>{
        fetch(this.apiUrl + '?studentID=' + studentIdData, {
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
                    this.getStudentArr();
                },
                (error) => {
                    console.log("err post=", error);
                })
           
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row EditNameClassDiv">
                    <input type="text" className = "classInput" id = "className" disabled ></input>
                <div className="iconEditNameClassDiv" id="BTNeditClassName" onClick={this.EditClassName}><MdCreate /></div>
                <div className="iconEditNameClassDiv" id="BTNsaveClassName" visibility = 'hidden' onClick={this.UpdateClassName}><IoMdCheckmark /></div>
                </div>
                <br/>
                <div className="row col-12 flex-container">
                {
                    this.state.StudentArr.map((item) =>
                        <CCOneStudent key = {item.studentID} student={item} SendDataToStudents={this.props.SendDataToHomeTeacher2} SendDeleteStudents={this.deleteStudent}/>
                    )
                    }
                    </div>

                <div className="AddnewStudent" id="AddnewStudent" onClick={this.AddStudent}>הוספת תלמיד +</div>
            </div>
        );
    };
}
