import React, { Component } from 'react';

import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';

import $ from 'jquery';

export default class CCNewMessage extends Component {
    constructor(props){
        super(props);
    
}



    render() {  
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                
            
            <Footer></Footer>
            </div>
        );
    };
}



