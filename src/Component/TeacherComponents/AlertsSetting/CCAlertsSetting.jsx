import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAlertsSetting.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import Switch from "react-switch";



export default class CCAlerts extends Component {
    constructor(props){
        super(props);
        this.state = { checked: false };
}

handleChange=(checked) =>{
    this.setState({ checked });
  }


    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div>
                <h4>צריך אולי שזה יבנה בצרה דינאמית בסוף אחשוב על זה </h4>
                <Switch onChange={this.handleChange} checked={this.state.checked} onColor="#CFA6D6" />
                </div>
            <Footer></Footer>
            </div>
        );
    };
}



