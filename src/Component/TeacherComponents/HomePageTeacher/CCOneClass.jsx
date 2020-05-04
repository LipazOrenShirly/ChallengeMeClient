import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css';
import CCStudents from './CCStudents';
import localHost from '../../LittleComponents/LocalHost';
//import { FaTrashAlt } from "react-icons/fa";
import { MdClose } from  "react-icons/md";
import Swal from 'sweetalert2';


export default class CCOneClass extends Component {
    constructor(props) {
        super(props);
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod'+ '/api/Class';
        }
    }

    deleteClass=()=>{
        Swal.fire({
            title: 'האם אתה בטוח?',
            text: "בלחיצה על הכפתור, הכיתה וכל תלמידייה ימחקו לצמיתות",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e0819a',
            cancelButtonColor: '#867D95',
            cancelButtonText:'בטל',
            confirmButtonText: 'כן, מחק'
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                title:'נמחק!',
                text:'הכיתה נמחקה בהצלחה',
                icon:'success',
                confirmButtonColor: '#e0819a',

              })
            
            this.props.SendClassNameToClasses(this.props.class.classID);
              }
          })
        

    }

    studentsPage = () => {
        this.props.SendDataToClasses(this.props.class);
    }
    render() {
        return (
            <div className="classNameHome col-3" dir="rtl" >
                <MdClose className="closeIcon" onClick={this.deleteClass}/>
                <span className="verticalMiddle" onClick={this.studentsPage}> {this.props.class.className}</span>
            </div>
        );
    };
}