import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import '../../../css/Style.css';
import './styleAlerts.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCOneAlert from './CCOneAlert';
import { FiSettings } from 'react-icons/fi';
import ProjectContext from '../../../Context/ProjectContext';
import FreeSoloStudents from '../Alerts/FreeSoloStudents';

export default class CCAlerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertArr: [],
            alertArrOriginal: [],
            alertArrSearch: [],
            students: [],
            search: false,
            deleteOn: false,
            pressCancelBtn: false
        }
        let local = false;
        this.apiUrlAlert = 'http://localhost:' + { localHost }.localHost + '/api/Alert';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrlAlert = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Alert';
            this.apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        this.getAlerts();
        this.getStudents(); //for the autocomplete of the search field
    }

    getAlerts = () => {
        const user = this.context;
        fetch(this.apiUrlAlert + '/getTeacherAlerts?teacherID=' + user.teacherID
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ alertArr: result, alertArrOriginal: result })
                },
                (error) => {
                    console.log("err get=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    getAlertIDForDelete = (alertID) => {
        this.deleteAlert(alertID);
    }

    deleteAlert = async (alertID) => {
        await this.setState({ deleteOn: true });
        var tempAlertsArr = await this.state.alertArr.filter((item) => item.alertID != alertID);
        await this.setState({ alertArr: tempAlertsArr });
        setTimeout(async function () {
            await this.setState({ deleteOn: false });
            if (this.state.pressCancelBtn == false) {
                await fetch(this.apiUrlAlert + '?alertID=' + alertID, {
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
                            this.getAlerts();
                        },
                        (error) => {
                            console.log("err post=", error);
                            Swal.fire({
                                title: 'אוי',
                                text: 'הפעולה נכשלה, נסה שנית',
                                icon: 'warning',
                                confirmButtonColor: '#e0819a',
                            })
                        });
            }
        }.bind(this), 5000);


    }

    getAlertIDForUpdateRead = (alertID) => {
        this.changeAlertToRead(alertID);
    }

    changeAlertToRead = (alertID) => {
        const user = this.context;
        fetch(this.apiUrlAlert + '?alertID=' + alertID, {
            method: 'PUT',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
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
                    console.log("fetch PUT= ", result);
                    this.getAlerts();
                },
                (error) => {
                    console.log("err post=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    getStudents = () => {
        const user = this.context;
        fetch(this.apiUrlStudent + '?teacherID=' + user.teacherID
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ students: result })
                },
                (error) => {
                    console.log("err get=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    goToStudentPage = (data) => {
        this.props.history.push({
            pathname: '/StudentPage',
            state: { student: data }
        })
    }
    goToStudentChat = (data) => {
        this.props.history.push({
            pathname: '/Chat',
            state: { student: data }
        })
    }

    linkToAlertsSetting = () => {
        this.props.history.push({
            pathname: '/AlertsSetting',
        })
    }

    onInputChange = (event, value) => {
        if (value == "") {         //אם אינפוט ריק אז ירוקן את הסטייט
            this.setState({ alertArrSearch: [], search: false });
            return;
        }
        this.getStudentAlerts(value);
        this.setState({ search: true });
    }

    getStudentAlerts = (value) => {
        const user = this.context;
        fetch(this.apiUrlAlert + '/getTeacherAlertsSearch?teacherID=' + user.teacherID + '&studentName=' + value
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ alertArrSearch: result })
                },
                (error) => {
                    console.log("err get=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    render() {
        var input = this.state.input;
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="row col-12 searchDiv">
                    <div className="col-12 turkiz">התרעות</div>

                    <div className="col-11 searchItselfDiv">
                        <FreeSoloStudents onInputChange={this.onInputChange} students={this.state.students} />
                    </div>

                    <div className="col-12 addingAlertsDiv">
                        <h5 className="h5Teacher" onClick={this.linkToAlertsSetting}>עריכת הגדרות להתראות<FiSettings style={{ marginLeft: "3%" }} size={25} /></h5>
                    </div>
                </div>

                {this.state.search == false && <div className="allAlerts">
                    {this.state.alertArr.map((item) =>
                        <CCOneAlert key={item.alertID} alert={item}
                            getAlertIDForDelete={this.getAlertIDForDelete}
                            getAlertIDForUpdateRead={this.getAlertIDForUpdateRead}
                            goToStudentPage={this.goToStudentPage}
                            goToStudentChat={this.goToStudentChat} />
                    )}
                </div>}

                {this.state.search && <div className="allAlerts">
                    {this.state.alertArrSearch.map((item) =>
                        <CCOneAlert key={item.alertID} alert={item}
                            getAlertIDForDelete={this.getAlertIDForDelete}
                            getAlertIDForUpdateRead={this.getAlertIDForUpdateRead}
                            goToStudentPage={this.goToStudentPage}
                            goToStudentChat={this.goToStudentChat} />
                    )}
                </div>}
                {
                    this.state.deleteOn&&
                    <div className="row justify-content-center">
                        <div className="row deleteMes col-11">
                            <div className="col-3 CancelDeleteBtn" onClick={() => { this.setState({ pressCancelBtn: true, deleteOn: false, alertArr: this.state.alertArrOriginal }); }} >בטל</div>
                            <div className="col-9" >ההתרעה נמחקה</div>
                        </div>
                    </div>
                }

            </div>
        );
    };
}



