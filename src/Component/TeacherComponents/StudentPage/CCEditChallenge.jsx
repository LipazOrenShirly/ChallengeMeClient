import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import { MdCreate } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
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
            status:this.props.location.state.challenge.status,
            // iconIsLevelInput: <MdCreate onClick={this.EditDifLevelInput} />,
            iconIsDeadline: <MdCreate onClick={this.EditDeadlineInput} color="whitesmoke" />,
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
        }

    }

    componentDidMount() {
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
                statusWord = "לא סימן כלום"
        }
        $('#StatusInput').val(statusWord);
        // $('#DifLevelInput').val(challenge.difficulty);

    }

    UpdateChallenge = async () => {
        // var statuss;
        // if ($('#StatusInput').val() == 'לא סימן כלום')
        //     statuss = 0;
        // else statuss = this.state.challenge.status;
        const challenge = await
            {
                challengeID: this.state.challenge.challengeID,
                studentID: this.state.challenge.studentID,
                difficulty: this.state.challenge.difficulty,
                deadline: $('#DeadlineInput').val(),
                status: this.state.status
            }
        await console.log(challenge);
        var returnVal = await false;
        await fetch(this.apiUrl,
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                else returnVal = true;
                return res.json();
            })
            .then(
                (result) => {
                    console.log("Student Challenges= ", result);
                    this.setState({ StudentChallenges: result });

                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'עדכון האתגר לא בוצע, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
        return await returnVal;
    }

    DeleteChallenge = () => {
        //תוקן
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
                        if (!res.ok)
                            throw new Error('Network response was not ok.');
                        return res.json();
                    })
                    .then(
                        (result) => {
                            console.log("fetch DELETE= ", result);
                            //תוקן
                            Swal.fire({
                                title: 'נמחק!',
                                text: 'האתגר נמחק בהצלחה',
                                icon: 'success',
                                confirmButtonColor: '#e0819a',
                            })
                            this.props.history.push({
                                pathname: '/StudentPage',
                                state: { student: this.props.location.state.student }
                            })
                        },
                        (error) => {
                            console.log("err post=", error);
                            //תוקן
                            Swal.fire({
                                title: 'משהו השתבש',
                                text: 'האתגר לא נמחק, אנא נסה שנית',
                                icon: 'warning',
                                confirmButtonColor: '#e0819a',
                            })
                        });


            }
        })
    }

    UpdateDeadline = async () => {
        var bool = await false;
        bool = await this.UpdateChallenge();
        await console.log("ffffff" + bool)
        if (bool) {
            //תוקן
            await Swal.fire({
                title: 'יופי!',
                text: 'תאריך הדד-לין עודכן בהצלחה',
                icon: 'success',
                confirmButtonColor: '#e0819a',
            })
        }
    }

    EditDeadlineInput = () => {
        let iconIsTemp = <IoMdCheckmark onClick={this.UpdateDeadline} />
        this.setState({ iconIsDeadline: iconIsTemp });
        $('#DeadlineInput').prop("disabled", false);

    }

    EditStatusInput = async () => {
        if (this.state.status == 0) {
           //תוקן
            await Swal.fire({
                title: '!שים לב',
                text: 'סטטוס האתגר מאופס כבר',
                confirmButtonColor: '#e0819a',
            })
        }
        else {
            //תוקן
            await Swal.fire({
                title: 'האם אתה בטוח?',
                text: "בלחיצה על איפוס יתאפס לתלמיד סטטוס האתגר",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e0819a',
                cancelButtonColor: '#867D95',
                cancelButtonText: 'בטל',
                confirmButtonText: 'כן, אפס'
            }).then(async (result) => {
                if (result.value) {
                    await this.setState({ status: 0 });
                    var bool = await this.UpdateChallenge();
                    if (bool == true) {
                        await $('#StatusInput').val('לא סימן כלום');
                        //תוקן
                        await Swal.fire({
                            title: 'יופי!',
                            text: 'סטטוס האתגר אופס בהצלחה',
                            icon: 'success',
                            confirmButtonColor: '#e0819a',
                        })
                    }
                }
            })
        }

    }

    // EditDifLevelInput = () => {
    //     let iconIsTemp = <IoMdCheckmark onClick={this.UpdateChallenge} />
    //     this.setState({ iconIsLevelInput: iconIsTemp });
    //     $('#DifLevelInput').prop("disabled", false);

    // }

    render() {
        console.log(this.props.location.state.challenge);
        const challenge = this.props.location.state.challenge;
        console.log(this.state.challenge);

        return (
            <div>
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="titleChalengeinCCEDIT">{this.props.location.state.student.studentName}</div>
                <div className="titleChalengeinCCEDIT">{challenge.challengeName}</div>
                <br />

                <div className="textEditChallenge"><strong>:תאריך סיום האתגר</strong></div>
                <div className="col-12 input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text spanCCEdit" id="basic-addon1">{this.state.iconIsDeadline}</span>
                    </div>
                    <input type="date" className="form-control inputCCEdit" id="DeadlineInput" min={new Date().toISOString().split("T")[0]} disabled />
                </div>


                <div className="textEditChallenge"><strong>:סטטוס האתגר </strong></div>
                <div className="col-12 input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text spanCCEdit" id="basic-addon1" onClick={this.EditStatusInput}>איפוס הסטטוס</span>
                    </div>
                    <input type="text" className="form-control inputCCEdit" id="StatusInput" disabled />
                </div>
                <div className="col-12">
                    <button id="deleteChallenge" className="btn btn-info btnDeleteChallenge" onClick={this.DeleteChallenge}>מחק את האתגר</button>
                </div>
            </div>
        );
    }
}

export default CCEditChallenge;