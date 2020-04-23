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
            arrowDownID :"arrowDown"+this.props.index,
            hiddendivID :"hiddendiv"+this.props.index,
            hiddendivIcon : "hiddendivIcon"+this.props.index,
        }
        
}
openDetail=()=>{
   
$('#'+this.state.arrowDownID).toggle();
$('#'+this.state.hiddendivID).toggle();
$('#'+this.state.hiddendivIcon).toggle();
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
                    <div className="col-12 arrowDown" id={this.state.arrowDownID}><IoIosArrowDown onClick={this.openDetail}/></div>
                   <div className="col-12 hiddendiv" id={this.state.hiddendivID} >גבי שלום, בלה בלה בלה</div>
                   <div className="col-12 hiddendivIcon" id={this.state.hiddendivIcon}><IoIosArrowUp onClick={this.openDetail}/></div>
               </div>
           </div>
            
            
           
        );
    };
}



