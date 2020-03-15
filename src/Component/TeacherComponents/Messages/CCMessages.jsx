import React, { Component } from 'react';

import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCOneMessage from './CCOneIncomeMessage';
import CCIncomeMessages from './CCIncomeMessages';
import CCSendingMessages from './CCSendingMessages';
import $ from 'jquery';

export default class CCAlerts extends Component {
    constructor(props){
        super(props);
       this.state={
        IncomeMessages: true,
       }
}

GoToIncomeMessages=()=>{
    if(this.state.IncomeMessages !=true)
     {
       this.setState({IncomeMessages:true});
     }  
     
}
GoToSendingMessages=()=>{
    if(this.state.IncomeMessages !=false)
    {
      this.setState({IncomeMessages:false});
    }  
    
   
}

    render() {  
        let whitch;  
        let textFonts;
            if (this.state.IncomeMessages == true) {
                whitch= <CCIncomeMessages/>;
                textFonts= <div className="col-12"><div id="INCOMEtext" className="col-6 turkiz floatLeft" onClick={this.GoToIncomeMessages}>הודעות נכנסות</div><div id="SENDINGtext" className="col-6 grey floatLeft" onClick={this.GoToSendingMessages}>הודעות יוצאות</div></div> ;
            }
           else{
           whitch = <CCSendingMessages/>;
           textFonts=<div className="col-12"><div id="INCOMEtext" className="col-6 grey floatLeft" onClick={this.GoToIncomeMessages}>הודעות נכנסות</div><div id="SENDINGtext" className="col-6 turkiz floatLeft" onClick={this.GoToSendingMessages}>הודעות יוצאות</div></div> ;
           }
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="row col-12 searchDiv">  
                <div className="col-12 turkiz">הודעות נכנסות</div>   
                <div className="col-8 searchItselfDiv">
                <input type="text" className="form-control inputRounded" id="search"  placeholder="חיפוש"></input>
                </div>
                <div className="col-8 addingAlertsDiv" onClick={this.linkToAlertsSetting}>
                </div>
                
                 {textFonts}
                     
            </div>
           <div className="allAlerts"> 
           
            {whitch}

           </div>
            
            <Footer></Footer>
            </div>
        );
    };
}



