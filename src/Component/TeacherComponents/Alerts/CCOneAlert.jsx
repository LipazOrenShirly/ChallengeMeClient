import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAlerts.css'
import { FaTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdMail } from  "react-icons/md";

export default class CCOneAlert extends Component {
    constructor(props){
        super(props);       
}

    render() {
        var alert = this.props.alert;
        // alertID, teacherID, studentID, alertTitle, alertText, alertDate, alertTime, alertRead, alertTypeID
        return (
            <div className="container-OneAlert col-12" onClick={ () => alert.alertRead == false && this.props.getAlertIDForUpdateRead(alert.alertID) }>
               
               <div className="row col-4 iconsAlertDiv">
                   <div className="iconDiv"><FaTrashAlt onClick={ () => this.props.getAlertIDForDelete(alert.alertID) }/></div>
                   <div className="iconDiv"><FaStar/></div>
                   <div className="iconDiv"><MdMail/></div>
               </div>
               <div className="row col-8 detailsOneAlert" style={{fontWeight: alert.alertRead ? 200 : 500}}>
                   <div className="col-12">{alert.alertDate} {alert.alertTime}</div>
                   <div className="col-12" onClick={ () => this.props.goToStudentPage(alert.studentID)}>{alert.alertTitle}</div>
                   <div className="col-12">{alert.alertText}</div>
               </div>
           </div>
            
            
           
        );
    };
}



