import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css';
import CCStudents from './CCStudents';


export default class CCOneStudent extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (

            <div className="classNameHome col-2" >
                <span className="verticalMiddle">{this.props.student.firstName}</span>
            </div>
        );
    };
}