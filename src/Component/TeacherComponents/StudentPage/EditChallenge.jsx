import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import { MdCreate } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

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
        $('#Deadline').val(challenge.deadline);
        $('#Status').val(challenge.status);
        $('#DifLevel').val(challenge.difficulty);
        $('#saveDeadline').hide();
        $('#saveStatus').hide();
        $('#saveDifLevel').hide();
    }

    UpdateChallenge = () => {
        const challenge = this.state.challenge;
        console.log(challenge);
        challenge.deadline = $('#deadline').val();
        challenge.status = $('#status').val();
        challenge.difficulty = $('#difLevel').val();
        console.log(challenge);

        fetch(this.apiUrl,
            {
                method: 'PUT',
                body: challenge,
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

    EditInput = (id) => {
        $('#'+id).prop("disabled", false);
        $('#edit'+id).hide();
        $('#save'+id).show();
    }

    render() {
        console.log(this.props.location.state.challenge);
        const challenge = this.props.location.state.challenge;
        console.log(this.state.challenge);

        return (
            <div>
                <div className="iconDiv" onClick={this.DeleteChallenge}><FaTrashAlt /></div>

                <p>deadline:</p>
                <input type="date" id="Deadline" disabled />
                <div className="iconDiv" id="editDeadline" onClick={this.EditInput("Deadline")}> <MdCreate /> </div>
                <div className="iconDiv" id="saveDeadline" visibility='hidden' onClick={this.UpdateChallenge}><IoMdCheckmark /></div>

                <p>status:</p>
                <input type="text" id="Status" disabled />
                <div className="iconDiv" id="editStatus" onClick={this.EditInput("Status")}> <MdCreate /> </div>
                <div className="iconDiv" id="saveStatus" visibility='hidden' onClick={this.UpdateChallenge}><IoMdCheckmark /></div>

                <p>difLevel:</p>
                <input type="text" id="DifLevel" disabled />
                <div className="iconDiv" id="editDifLevel" onClick={this.EditInput("DifLevel")}> <MdCreate /> </div>
                <div className="iconDiv" id="saveDifLevel" visibility='hidden' onClick={this.UpdateChallenge}><IoMdCheckmark /></div>

            </div>
        );
    }
}

export default EditChallenge;