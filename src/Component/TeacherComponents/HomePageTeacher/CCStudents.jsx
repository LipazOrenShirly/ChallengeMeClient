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
import Swal from 'sweetalert2';


import $ from 'jquery';

export default class CCStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Class: this.props.class,
            StudentArr: []
        };

        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        this.apiUrlClass = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
            this.apiUrlClass = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Class';
        }
    }

    componentDidMount() {
        $('#BTNsaveClassName').hide();
        this.getStudentArr();
    }

    getStudentArr = () => {
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("StudentArr= ", result);
                    this.setState({ StudentArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'לא מצליח למצוא את התלמידים, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    EditClassName = () => {
        $('#className').prop("disabled", false);
        $('#BTNeditClassName').hide();
        $('#BTNsaveClassName').show();
    }

    AddStudent = () => {
        this.props.goToAddNewStudent(this.props.class.classID);
    }

    UpdateClassName = () => {
        var classTemp=this.state.Class;
        classTemp.className=$('#className').val();
        this.setState({Class:classTemp});
        console.log(this.state.Class);
        var updatedClass = {
            className: this.state.Class.className,
            classID: this.state.Class.classID,
            teacherID: this.state.Class.teacherID
        }

        fetch(this.apiUrlClass, {
            method: 'PUT',
            body: JSON.stringify(updatedClass),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch PUT= ", result);
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'שם הכיתה לא השתנה, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
        $('#BTNsaveClassName').hide();
        $('#BTNeditClassName').show();
        $('#className').prop("disabled", true);
    }

    deleteStudent = (studentIdData) => {
        fetch(this.apiUrl + '?studentID=' + studentIdData, {
            method: 'DELETE',
            headers: new Headers({
                'accept': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch DELETE= ", result);
                    //תוקן
                    Swal.fire({
                        title: 'נמחק!',
                        text: 'התלמיד נמחק בהצלחה',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    })
                    this.getStudentArr();
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'התלמיד לא נמחק, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })

    }

    render() {
        var className = this.state.Class.className
        return (
            <div className="container-fluid">
                <div className="row mp0 EditNameClassDiv justify-content-center">
                    <input type="text" className="classInput" id="className" defaultValue={className} size={className.length} disabled ></input>
                    <div className="iconEditNameClassDiv" id="BTNeditClassName" onClick={this.EditClassName}><MdCreate /></div>
                    <div className="iconEditNameClassDiv" id="BTNsaveClassName" visibility='hidden' onClick={this.UpdateClassName}><IoMdCheckmark /></div>
                </div>
                
                <div className="col-12">
                    <div className="row mp0 flex-container containerStudents">
                        {
                            this.state.StudentArr.map((item) =>
                                <CCOneStudent key={item.studentID} student={item} goToStudentPage={this.props.goToStudentPage} SendDeleteStudents={this.deleteStudent} />
                            )
                        }
                    </div>
                </div>
                <div className="AddnewStudent" id="AddnewStudent" onClick={this.AddStudent}>הוספת תלמיד +</div>
                <br />
            </div>
        );
    };
}
