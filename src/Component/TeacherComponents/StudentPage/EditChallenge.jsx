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

class EditChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: this.props.location.state.challenge
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
        $('#StatusInput').val(challenge.status);
        $('#DifLevelInput').val(challenge.difficulty);
        $('#saveDeadline').hide();
        $('#saveStatus').hide();
        $('#saveDifLevel').hide();
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
        fetch(this.apiUrl+'?challengeID='+this.state.challenge.challengeID+'&studentID='+this.state.challenge.studentID, {
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
                },
                (error) => {
                    console.log("err post=", error);
                });
        // window.location.reload();
    }

    EditDeadlineInput = () => {
        $('#DeadlineInput').prop("disabled", false);
        $('#editDeadline').hide();
        $('#saveDeadline').show();
    }

    EditStatusInput = () => {
        $('#StatusInput').prop("disabled", false);
        $('#editStatus').hide();
        $('#saveStatus').show();
    }

    EditDifLevelInput = () => {
        $('#DifLevelInput').prop("disabled", false);
        $('#editDifLevel').hide();
        $('#saveDifLevel').show();
    }

    render() {
        console.log(this.props.location.state.challenge);
        const challenge = this.props.location.state.challenge;
        console.log(this.state.challenge);

        return (
            <div>
                <NavBar />
                
                <p>תאור האתגר: {challenge.challengeName}</p>
                <p>קטגוריה: {challenge.categoryName}</p>

                <p>תאריך סיום:</p>
                <input type="date" id="DeadlineInput" disabled />
                <div className="iconDiv" id="editDeadline" onClick={this.EditDeadlineInput}> <MdCreate /> </div>
                <div className="iconDiv" id="saveDeadline" visibility='hidden' onClick={this.UpdateChallenge}><IoMdCheckmark /></div>

                <p>סטטוס:</p>
                <input type="text" id="StatusInput" disabled />
                <div className="iconDiv" id="editStatus" onClick={this.EditStatusInput}> <MdCreate /> </div>
                <div className="iconDiv" id="saveStatus" visibility='hidden' onClick={this.UpdateChallenge}><IoMdCheckmark /></div>

                <p>רמת קושי:</p>
                <input type="text" id="DifLevelInput" disabled />
                <div className="iconDiv" id="editDifLevel" onClick={this.EditDifLevelInput}> <MdCreate /> </div>
                <div className="iconDiv" id="saveDifLevel" visibility='hidden' onClick={this.UpdateChallenge}><IoMdCheckmark /></div>
                
                <br />
                <div className="iconDiv" onClick={this.DeleteChallenge}><FaTrashAlt /></div>

                <Footer />
            </div>
        );
    }
}

export default EditChallenge;