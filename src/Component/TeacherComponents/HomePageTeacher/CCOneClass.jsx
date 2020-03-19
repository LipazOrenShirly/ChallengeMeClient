import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css';
import CCStudents from './CCStudents';
import localHost from '../../LittleComponents/LocalHost';


export default class CCOneClass extends Component {
    constructor(props) {
        super(props);

    }

    studentsPage = () => {
        this.props.SendDataToClasses(this.props.class);
    }
    render() {
        return (
            <div className="classNameHome col-2" onClick={this.studentsPage}>
                <span className="verticalMiddle">{this.props.class.className}</span>
            </div>
        );
    };
}















