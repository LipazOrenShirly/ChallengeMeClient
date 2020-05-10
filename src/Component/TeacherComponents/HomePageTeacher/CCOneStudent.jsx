import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css';
import CCStudents from './CCStudents';
import localHost from '../../LittleComponents/LocalHost';
import { MdClose } from "react-icons/md";
import Swal from 'sweetalert2';

export default class CCOneStudent extends Component {
    constructor(props) {
        super(props);
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    DeleteStudent = () => {
        Swal.fire({
            title: 'האם אתה בטוח?',
            text: "בלחיצה על כן, התלמיד וכל פרטיו יימחקו",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e0819a',
            cancelButtonColor: '#867D95',
            cancelButtonText: 'בטל',
            confirmButtonText: 'כן, מחק'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'נמחק!',
                    text: 'התלמיד נמחק בהצלחה',
                    icon: 'success',
                    confirmButtonColor: '#e0819a',

                })

                this.props.SendDeleteStudents(this.props.student.studentID);
            }
        })
    }

    render() {
        return (

            <div className="classNameHome col-3" dir="rtl" >
                <MdClose className="closeIcon" onClick={this.DeleteStudent} />
                <span className="verticalMiddle" onClick={() => this.props.goToStudentPage(this.props.student)}>
                    {this.props.student.firstName} {this.props.student.lastName}
                </span>

            </div>
        );
    };
}