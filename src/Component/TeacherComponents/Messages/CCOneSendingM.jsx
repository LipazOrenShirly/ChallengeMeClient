import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleMessages.css'
import { FaTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import $ from 'jquery';


export default class CCOneSendingM extends Component {
    constructor(props){
        super(props);
        this.state={
            arrowDownID 
        }
        var arrowDownID = "arrowDown"+this.props.index;
        var hiddendivID = "hiddendiv"+this.props.index;
}
openDetail=()=>{
   
$('#'+arrowDownID).toggle();
$('#'+hiddendivID).toggle();
}


    render() {
        
        return (
            <div className="container-OneAlert col-12">
               
               <div className="row col-4 iconsAlertDiv">
                   <div className="iconDiv"><FaTrashAlt/></div>
                   <div className="iconDiv"><FaStar/></div>
                   <div className="iconDiv"><FaReply/></div>
               </div>
               <div className="row col-8 detailsOneAlert">
                   <div className="col-12">22/10/2020 שעה 12:00</div>
                    <div className="col-12 arrowDown" id={arrowDownID}><IoIosArrowDown onClick={this.openDetail}/></div>
                   <div className="col-12 hiddendiv" id={hiddendivID} >המורה אני לא מצליח את האתגר ואני לא יודע מה לעשות אני צריך עזרהההההההההההההה</div>
                   <div className="col-12 hiddendiv" id={hiddendivID}><IoIosArrowUp onClick={this.openDetail}/></div>
               </div>
           </div>
            
            
           
        );
    };
}



