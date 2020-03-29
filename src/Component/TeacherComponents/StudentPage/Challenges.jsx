import React, { Component } from 'react';
import OneChallenge from './OneChallenge';
import localHost from '../../LittleComponents/LocalHost';

class Challenges extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            StudentChallenges: []
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount = () => {
        fetch(this.apiUrl + '?studentID='+this.props.studentID
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
                    this.setState({StudentChallenges: result});
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    AddChallenge = () => {
        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            mail: this.state.mail,
            phone: this.state.phone,
            password: this.state.password,
            school: this.state.school
        }
        console.log('data=' + data);
        fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
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
                    console.log("fetch POST= ", result);

                },
                (error) => {
                    console.log("err post=", error);
                })
            .then(
                this.props.history.push({
                    pathname: '/TeacherLogin',
                })
            );
    }

    render() { 
        return ( 
            <div>
                {this.state.StudentChallenges.map( (item) => 
                    <OneChallenge key = {item.challengeID} challenge = {item} goToEditChallenge = {this.props.goToEditChallenge} />
                    )}
                <button type="text" onClick={this.AddChallenge}>הוספת אתגר</button>
            </div>
         );
    }
}
 
export default Challenges;