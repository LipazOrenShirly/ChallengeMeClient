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
        return (
            <div className="container-OneAlert col-12">
               
               <div className="row col-4 iconsAlertDiv">
                   <div className="iconDiv"><FaTrashAlt/></div>
                   <div className="iconDiv"><FaStar/></div>
                   <div className="iconDiv"><MdMail/></div>
               </div>
               <div className="row col-8 detailsOneAlert">
                   <div className="col-12">22/10/2020 שעה 12:00</div>
                   <div className="col-12">רינת סיימה את אתגר 4 בהצלחה</div>
               </div>
           </div>
            
            
           
        );
    };
}



