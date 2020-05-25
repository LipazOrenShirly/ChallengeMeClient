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
            allAlertArr: [],
            alertArr: [],
            input: "",
            alertArrSearch: [],
        }
        let local = false;
        this.apiUrlAlert = 'http://localhost:' + { localHost }.localHost + '/api/Alert';
        if (!local) {
            this.apiUrlAlert = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Alert';
        }
    }
    
    static contextType = ProjectContext;
//123
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
                this.setState({ allAlertArr: result, alertArr: result})
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

    goToStudentPage = (data) => {
        this.props.history.push({
            pathname: '/StudentPage',
            state: { student: data }
        })
    }
    goToStudentChat= (data) => {
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

    inputChange = async (e) => {
        await this.setState({ input: e.target.value });
        await console.log(this.state.input);
        await this.state.input == "" && this.setState({ alertArr: this.state.allAlertArr});
        await this.state.input != "" && this.getStudentAlerts();
    }

    getStudentAlerts = () => {
        const user = this.context;
        fetch(this.apiUrlAlert + '/getTeacherAlertsSearch?teacherID=' + user.teacherID+'&studentName='+this.state.input
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
                this.setState({ alertArrSearch: result ,alertArr: result})
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
                        <input type="text" id="search" className="form-control inputRounded" placeholder="חיפוש" 
                            value={input} onChange={ (e) => this.inputChange(e) }
                        />
                    </div>

                    <div className="col-12 addingAlertsDiv" onClick={this.linkToAlertsSetting}>
                        <h5 className="h5Teacher">עריכת הגדרות להתראות<FiSettings style={{ marginLeft: "3%" }} size={25} /></h5>
                    </div>
                </div>
                
                <div className="allAlerts">
                    {this.state.alertArr.map( (item) => 
                        <CCOneAlert key={item.alertID} alert={item} 
                            getAlertIDForDelete={this.getAlertIDForDelete} 
                            getAlertIDForUpdateRead={this.getAlertIDForUpdateRead}
                            goToStudentPage={this.goToStudentPage}
                            goToStudentChat={this.goToStudentChat}/>
                    )}
                </div>
                <Footer />
            </div>
        );
    };
}



