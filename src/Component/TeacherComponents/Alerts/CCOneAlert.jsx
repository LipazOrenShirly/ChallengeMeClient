import React, { Component } from 'react';
import '../../../css/Style.css';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';

import './styleAlerts.css'
import { FaTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import EmptyImgStudentBase64 from '../../LittleComponents/emptyImgStudent';

export default class CCOneAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            dataImg: EmptyImgStudentBase64,
            student:{},
          
        }
        let local = false;
        this.apiUrStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    componentDidMount() {
        fetch(this.apiUrStudent + '?studentID=' + this.props.alert.studentID
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
                    console.log("Student= ", result[0]);
                    this.setState({ student: result[0] });
                    if(result[0].imageStudent != null)
                        this.setState({dataImg:result[0].imageStudent})
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

    clickAlert = () => {
        if (this.props.alert.alertRead == false)
            this.props.getAlertIDForUpdateRead(this.props.alert.alertID)
        // this.setState({ alertOpen: true });
        this.setState(prevState => ({alertOpen: !prevState.alertOpen}));
    }

    render() {
        var alert = this.props.alert;
        // alertID, teacherID, studentID, alertTitle, alertText, alertDate, alertTime, alertRead, alertTypeID
        return (
            <div className="justify-content-left">
                <div className="container-OneAlert col-12" onClick={this.clickAlert}>

                    <div className="row col-2 iconsAlertDiv">
                        <div className="iconDiv"><FaTrashAlt onClick={() => this.props.getAlertIDForDelete(alert.alertID)} /></div>
                        {this.state.alertOpen &&
                            <div className="iconDiv"><MdMail /></div>
                        }
                    </div>
                    <div className="row col-7 detailsOneAlert" style={{ fontWeight: alert.alertRead ? 200 : 500 }}>
                        <div className="col-12">{alert.alertDate} {alert.alertTime}</div>
                        <div className="col-12">{alert.alertTitle}</div>
                        {this.state.alertOpen &&
                            <div className="col-12" >{alert.alertText}</div>
                        }

                    </div>
                    <div className="col-3" onClick={() => this.props.goToStudentPage(alert.studentID)}>
                    <img className="emptyUserImgMes" src={`data:image/jpeg;base64,${this.state.dataImg}`} />
                    </div>
                </div>
                <hr />
            </div>



        );
    };
}



