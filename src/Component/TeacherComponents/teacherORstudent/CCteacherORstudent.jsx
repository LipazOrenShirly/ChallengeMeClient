import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../../css/Style.css';
import './styleteacherORstudent.css'

export default class CCteacherORstudent extends Component {
    
    constructor(props){
        super(props);
    }

    heIsStudent=()=>{
        this.props.history.push({
            pathname:'/StudentLogin',
        })     
    }
    heIsTeacher=()=>{
        this.props.history.push({
            pathname:'/TeacherLogin',
        })   
    }
   
    render() {
        return (
            <div className="container-fluid col-xs-12 screentos" >
                <div className="containerTeacherOrStudent">
                <h1>האם אתה</h1>
                <div className="col-12"><button type="button" onClick={this.heIsTeacher} className="btn btn-light btnpinkTotS col-5">מורה</button>
                
                <button type="button" className="btn btn-info btnpinkTotS btnPinkTOS col-5" onClick={this.heIsStudent}>תלמיד</button></div>
                </div>
            </div>
        );
    };
}