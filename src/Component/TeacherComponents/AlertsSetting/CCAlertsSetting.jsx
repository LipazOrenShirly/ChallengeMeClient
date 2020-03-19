import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAlertsSetting.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import Switch from "react-switch";



export default class CCAlerts extends Component {
    constructor(props){
        super(props);
        this.state = { 
            checkedSuccess: false ,
            checkedFailure: false ,
            checkedNeedHelp: false ,
            checkedReachDadline: false ,
        };
}

handleChangeSuccess=(checked) =>{
    this.setState({ checkedSuccess:checked });
  }
handleChangeFailure=(checked) =>{
    this.setState({ checkedFailure:checked });
  }
handleChangeNeedHelp=(checked) =>{
    this.setState({ checkedNeedHelp:checked });
  }
handleChangeReachDadline=(checked) =>{
    this.setState({ checkedReachDadline:checked });
  }

    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="col-12">
                <div className="row col-12">
                <div className="AlertSettingText col-10">הצלחתי</div>
                <div className="SwitchDiv col-2">
                <Switch id="SwitchSuccess" className="Switches" onChange={this.handleChangeSuccess} checked={this.state.checkedSuccess} onColor="#CFA6D6" />
                </div></div>
                <div className="row col-12">
                <div className="AlertSettingText col-10">לא הצלחתי</div>
                <div className="SwitchDiv col-2">
                <Switch id="SwitchFailure" className="Switches" onChange={this.handleChangeFailure} checked={this.state.checkedFailure} onColor="#CFA6D6" />
                </div>
                </div>
                <div className="row col-12">
                <div className="AlertSettingText col-10">צריך עזרה</div>
                <div className="SwitchDiv col-2">
                <Switch id="SwitchNeedHelp" className="Switches" onChange={this.handleChangeNeedHelp} checked={this.state.checkedNeedHelp} onColor="#CFA6D6" />
                </div>
                </div>
                <div className="row col-12">
                <div className="AlertSettingText col-10">הגעה לדד ליין לפני סיום האתגר</div>
                <div className="SwitchDiv col-2">
                <Switch id="SwitchReachDadline" className="Switches" onChange={this.handleChangeReachDadline} checked={this.state.checkedReachDadline} onColor="#CFA6D6" />
                </div></div>
                </div>
            <Footer></Footer>
            </div>
        );
    };
}



