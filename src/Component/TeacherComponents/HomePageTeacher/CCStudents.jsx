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
            Class: this.props.location.state.Class != null ? this.props.location.state.Class : "",
            StudentArr: []
        };
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }
    
     componentDidMount = () => {
        $('#BTNsaveClassName').hide();
        $('#className').val(this.state.Class.className);
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

    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar><br /><br />
                <SearchBarHomeTeacher />
                <div className="turkiz">
                    <input type="text" className = "classInput" id = "className" disabled ></input>
                </div>
                <div className="iconDiv" id="BTNeditClassName" onClick={this.EditClassName}><MdCreate /></div>
                <div className="iconDiv" id="BTNsaveClassName" visibility = 'hidden' onClick={this.UpdateClassName}><IoMdCheckmark /></div>
                <br />
                {
                    this.state.StudentArr.map((item) =>
                        <CCOneStudent teacherID={this.state.teacherID} student={item} SendDataToClasses={this.getDataFromOneClass} />
                    )}
                <div className="AddnewStudent" id="AddnewStudent" onClick={this.AddStudent}>הוספת תלמיד +</div>

                <Footer></Footer>
            </div>
        );
    };
}
