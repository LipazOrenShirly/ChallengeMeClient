import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';

class StudentPage extends Component {
    constructor(props) {
        super(props);
        // this.state = { }
        let local = true;
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        this.apiUrlStudentChallenge = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount = () => {
        fetch(this.apiUrlStudent + '?studentID=21'
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
                    console.log("Student Data= ", result);
                },
                (error) => {
                    console.log("err get=", error);
                });

        fetch(this.apiUrlStudentChallenge + '?studentID=21'
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
                    console.log("Student Challenges= ", result);
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default StudentPage;