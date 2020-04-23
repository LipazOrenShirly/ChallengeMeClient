import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import OneStudentsWithMessage from './CCOneStudentsWithMessage';

export default class StudentsWithMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentIDArr: []
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
        fetch(this.apiUrl + '?teacherID=' + user.teacherID
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
                    console.log("studentsArr= ", result);
                    this.setState({ studentIDArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {
    
        return (
            <div className="container-fluid">
                {this.state.studentIDArr.map( (item) =>
                    <OneStudentsWithMessage studentID = {item} onClick = { () => this.props.goToChat(item)}/>
                )}       
            </div>
        );
    };
}



