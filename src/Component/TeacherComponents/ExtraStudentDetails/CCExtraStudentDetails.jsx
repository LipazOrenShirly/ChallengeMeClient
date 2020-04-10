import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import '../../../css/Style.css';
import './styleExtraStudentDetails.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'
import ProjectContext from '../../../Context/ProjectContext';
import $ from 'jquery';
import NavBar from '../../LittleComponents/NavBar';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CCExtraStudentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
        }
        let local = true;
        this.apiUrlClass = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }


    Submit = (event) => {
        let DifLevelInput = $('#DifLevelInput').val();
        if(DifLevelInput=="" || this.state.startDate==null){
        Swal.fire({
                      title: 'שים לב',
                      text: 'כל הערכים צריכים להיות מלאים',
                      icon: 'warnning',
                      confirmButtonColor: '#e0819a',
                    })
                    return;
                }
        alert(DifLevelInput);
        console.log(this.state.startDate.ToString("dd/mm/yyyy"))
//כאן יהיה פקודת פוסט.. צריך לשים לב שהתאריך מגיע בצורה מוזרה
        event.preventDefault();
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="loginDiv">
                    <NavBar></NavBar><br />
                    <form onSubmit={this.Submit}>
                        <div className="purpule"><strong>:האתגר הנבחר</strong></div>
                        <div id="chosenChallenge">לכאן צריך להכנס שם האתגר מהדאתא בייס</div>
                        <br />
                        <div className="purpule"><strong>:תאריך סיום האתגר</strong></div>
                        <div className="col-12 input-group mb-3 dp">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={date => this.setState({ startDate: date })}
                                minDate={new Date()}
                                className="form-control col-12 inputCCEdit"
                                id="DeadlineChallengeId"

                            // placeholderText="Select a date between today and 5 days in the future"
                            />
                        </div>
                        <div className="purpule"><strong>:רמת קושי האתגר</strong></div>
                        <div className="col-12 input-group mb-3">
                            <select class="form-control inputCCEdit" id="DifLevelInput">
                                <option value="" >..בחר</option>
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                            </select>
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

export default CCExtraStudentDetails;