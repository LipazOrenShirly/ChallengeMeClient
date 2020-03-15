import React, { Component } from 'react';

import '../../../css/Style.css';
import './styleAlerts.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCOneAlert from './CCOneAlert';


//test

export default class CCAlerts extends Component {
    constructor(props){
        super(props);
       
}

linkToAlertsSetting=()=>{
    this.props.history.push({
        pathname:'/AlertsSetting',
    })   
}
    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="row col-12 searchDiv"> 
                <div className="col-12 turkiz">התרעות</div>  
                <div className="col-8 searchItselfDiv">
                <input type="text" className="form-control inputRounded" id="search"  placeholder="חיפוש"></input>
                </div>
                
                <div className="col-8 addingAlertsDiv" onClick={this.linkToAlertsSetting}>
               <h5>עריכת הגדרות להתראות</h5>
                </div>
            </div>
           <div className="allAlerts"> 
            <CCOneAlert / >
            <CCOneAlert / >
            <CCOneAlert / >
            <CCOneAlert / >
                <CCOneAlert / >


           </div>
            
            <Footer></Footer>
            </div>
        );
    };
}



