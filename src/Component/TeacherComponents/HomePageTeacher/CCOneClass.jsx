import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css';
import CCStudents from './CCStudents';


export default class CCOneClass extends Component {
    constructor(props) {
        super(props);
      
    }

    studentsPage=()=>{
        this.props.SendDataToClasses(this.props.Nameofclass);
    }
    render() {
        return (

        <div className="classNameHome col-2" onClick={this.studentsPage}><span className="verticalMiddle">{this.props.Nameofclass}</span></div>
        );
    };
}















