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

export default class CCAlerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertArr: []
        }
        let local = true;
        this.apiUrlAlert = 'http://localhost:' + { localHost }.localHost + '/api/Alert';
        if (!local) {
            this.apiUrlAlert = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Alert';
        }
    }
    
    static contextType = ProjectContext;

    componentDidMount() {
       this.getAlerts(); 
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
                this.setState({ alertArr: result })
            },
            (error) => {
                console.log("err get=", error);
                Swal.fire({
                    title: 'אוי',
                    text: 'הפעולה נכשלה, נסה שנית',
                    icon: 'warning',
                    confirmButtonColor: '#e0819a',
                })
            })
    }

    getAlertIDForDelete = (alertID) => {
        this.deleteAlert(alertID);
    }

    deleteAlert = (alertID) => {
        fetch(this.apiUrlAlert + '?alertID=' + alertID, {
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

    goToStudentPage = (studentID) => {
        alert('פה צריך לשלוח אובייקט סטודנט לעמוד סטודנט ואין לנו פה אובייקט שלם אז צריך להחליט איך לעשות את זה')
        this.props.history.push({
            pathname: '/StudentPage',
        })
    }

    linkToAlertsSetting = () => {
        this.props.history.push({
            pathname: '/AlertsSetting',
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="row col-12 searchDiv">
                    <div className="col-12 turkiz">התרעות</div>
                    <div className="col-8 searchItselfDiv">
                        <input type="text" className="form-control inputRounded" id="search" placeholder="חיפוש"></input>
                    </div>

                    <div className="col-12 addingAlertsDiv" onClick={this.linkToAlertsSetting}>
                        <h5 >עריכת הגדרות להתראות<FiSettings style={{ marginLeft: "3%" }} size={25} /></h5>
                    </div>
                </div>
                <div className="allAlerts">
                    {this.state.alertArr.map( (item) => 
                        <CCOneAlert alert={item} getAlertIDForDelete={this.getAlertIDForDelete} 
                            getAlertIDForUpdateRead={this.getAlertIDForUpdateRead}
                            goToStudentPage={this.goToStudentPage}/>
                    )}
                </div>
                <Footer />
            </div>
        );
    };
}



