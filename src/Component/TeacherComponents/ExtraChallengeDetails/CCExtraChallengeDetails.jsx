import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import '../../../css/Style.css';
import './styleExtraChallengeDetails.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'
import ProjectContext from '../../../Context/ProjectContext';
import $ from 'jquery';
import NavBar from '../../LittleComponents/NavBar';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CCExtraChallengeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            student: {}
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        this.apiUrStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod'+ '/api/StudentChallenge';
            this.apiUrStudent  = 'https://proj.ruppin.ac.il/igroup2/prod'+ '/api/Student';
        }
    }

    componentDidMount() {
        fetch(this.apiUrStudent + '?studentID=' + this.props.location.state.studentID
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
                console.log("Student= ", result[0]);
                this.setState({ student: result[0] })
            },
            (error) => {
                console.log("err get=", error);
            });
    }

    Submit = (event) => {
        if (this.state.deadline == null) {
            Swal.fire({
                title: 'שים לב',
                text: 'יש לבחור תאריך סיום לביצוע האתגר',
                icon: 'warnning',
                confirmButtonColor: '#e0819a',
            });
            return;
        }

        const studentChallenge = {
            challengeID: this.props.location.state.challenge.challengeID,
            studentID: this.props.location.state.studentID,
            deadline: $('#DeadlineChallengeId').val().replace(/(..).(..).(....)/, "$3-$1-$2"),
        }
        console.log(studentChallenge);
        fetch(this.apiUrl, {   
            method: 'POST',
            body: JSON.stringify(studentChallenge),
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
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'הוספת את האתגר בהצלחה!',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    });
                    this.props.history.push({
                        pathname: '/StudentPage',
                        state: {student: this.state.student}
                    });
                },
                (error) => {
                    console.log("err post=", error);
                });

        event.preventDefault();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="loginDiv">
                    <NavBar></NavBar><br />
                    <form onSubmit={this.Submit}>
                        <div className="purpule"><strong>:האתגר הנבחר</strong></div>
                        <div id="chosenChallenge"> {this.props.location.state.challenge.challengeName}</div>
                        <br />
                        <div className="purpule"><strong>:תאריך סיום ביצוע האתגר</strong></div>
                        <div className="col-12 input-group mb-3 dp">
                            <DatePicker
                                selected={this.state.deadline}
                                onChange={date => this.setState({ deadline: date })}
                                minDate={new Date()}
                                className="form-control col-12 inputCCEdit"
                                id="DeadlineChallengeId"
                                required
                            // placeholderText="Select a date between today and 5 days in the future"
                            />
                        </div>
                        <div className="form-group col-12">
                            <button className="btn btn-info createNewChallenge">שמור</button>
                        </div>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default CCExtraChallengeDetails;