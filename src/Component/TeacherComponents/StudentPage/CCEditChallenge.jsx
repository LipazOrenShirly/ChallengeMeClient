import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import { MdCreate } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import './styleStudentPage.css';
import '../../../css/Style.css';
import Swal from 'sweetalert2';
import { TiArrowBack } from 'react-icons/ti';


class CCEditChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: this.props.location.state.challenge,
            iconIsLevelInput: <MdCreate onClick={this.EditDifLevelInput} />,
            iconIsDeadline: <MdCreate onClick={this.EditDeadlineInput} />,
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount = () => {
        const challenge = this.state.challenge;
        $('#DeadlineInput').val(challenge.deadline);
        var statusWord;
        switch (challenge.status) {
            case '1':
                statusWord = "הצליח את האתגר"
                break;
            case '2':
                statusWord = "לא הצליח את האתגר"
                break;
            case '3':
                statusWord = "צריך עזרה"
                break;
            default:
                statusWord="לא סימן כלום"
        }
        $('#StatusInput').val(statusWord);
        $('#DifLevelInput').val(challenge.difficulty);

    }

    UpdateChallenge = () => {
        const challenge =
        {
            challengeID: this.state.challenge.challengeID,
            studentID: this.state.challenge.studentID,
            difficulty: $('#DifLevelInput').val(),
            deadline: $('#DeadlineInput').val(),
            status: $('#StatusInput').val()
        }
        console.log(challenge);

        fetch(this.apiUrl,
            {
                method: 'PUT',
                body: JSON.stringify(challenge),
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
                    this.setState({ StudentChallenges: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    DeleteChallenge = () => {
        Swal.fire({
            title: 'האם אתה בטוח?',
            text: "בלחיצה על מחק יימחק האתגר לצמיתות",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e0819a',
            cancelButtonColor: '#867D95',
            cancelButtonText: 'בטל',
            confirmButtonText: 'כן, מחק'
        }).then((result) => {
            if (result.value) {

                fetch(this.apiUrl + '?challengeID=' + this.state.challenge.challengeID + '&studentID=' + this.state.challenge.studentID, {
                    method: 'DELETE',
                    headers: new Headers({
                        'accept': 'application/json; charset=UTF-8'
                    })
                })
                    .then(res => {
                        console.log('res=', res);
                        return res.json()
                    })
                    .then(
                        (result) => {
                            console.log("fetch DELETE= ", result);
                            Swal.fire({
                                title: 'נמחק!',
                                text: 'האתגר נמחק בהצלחה',
                                icon: 'success',
                                confirmButtonColor: '#e0819a',
                            })
                            this.props.history.push({
                                pathname: '/StudentPage',
                            })
                        },
                        (error) => {
                            console.log("err post=", error);
                        });
                // window.location.reload();


            }
        })
    }

    EditDeadlineInput = () => {
        let iconIsTemp = <IoMdCheckmark onClick={this.UpdateChallenge} />
        this.setState({ iconIsDeadline: iconIsTemp });
        $('#DeadlineInput').prop("disabled", false);

    }

    EditStatusInput = () => {
        if (this.state.challenge.status == 0) {
            Swal.fire({
                title: '!שים לב',
                text: 'סטטוס האתגר מאופס כבר',
                confirmButtonColor: '#e0819a',
            })
        }
        else {
            Swal.fire({
                title: 'האם אתה בטוח?',
                text: "בלחיצה על איפוס יתאפס לתלמיד סטטוס האתגר",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e0819a',
                cancelButtonColor: '#867D95',
                cancelButtonText: 'בטל',
                confirmButtonText: 'כן, אפס'
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: 'אופס!',
                        text: 'סטטוס האתגר אופס בהצלחה',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    })
                    $('#StatusInput').val(0);
                    this.UpdateChallenge();
                }
            })
        }

    }

    EditDifLevelInput = () => {
        let iconIsTemp = <IoMdCheckmark onClick={this.UpdateChallenge} />
        this.setState({ iconIsLevelInput: iconIsTemp });
        $('#DifLevelInput').prop("disabled", false);

    }
    
    render() {
        console.log(this.props.location.state.challenge);
        const challenge = this.props.location.state.challenge;
        console.log(this.state.challenge);

        return (
            <div>
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={()=> window.history.back()} size={40} />
                </div>
                <div className="titleChalengeinCCEDIT">{this.props.location.state.student.studentName}</div>
                <div className="titleChalengeinCCEDIT">{challenge.challengeName}</div>
                <br />

                <div><strong>:תאריך סיום האתגר</strong></div>
                <div className="col-12 input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text spanCCEdit" id="basic-addon1">{this.state.iconIsDeadline}</span>
                    </div>
                    <input type="date" className="form-control inputCCEdit" id="DeadlineInput" disabled />
                </div>


                <div><strong>:סטטוס האתגר </strong></div>
                <div className="col-12 input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text spanCCEdit" id="basic-addon1" onClick={this.EditStatusInput}>איפוס הסטטוס</span>
                    </div>
                    <input type="text" className="form-control inputCCEdit" id="StatusInput" disabled />
                </div>              
                <div className="col-12">
                    <button id="deleteChallenge" className="btn btn-info btnDeleteChallenge" onClick={this.DeleteChallenge}>מחק את האתגר</button>
                </div>
                <Footer />
            </div>
        );
    }
}

export default CCEditChallenge;