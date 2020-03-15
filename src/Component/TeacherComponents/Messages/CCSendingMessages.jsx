import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleMessages.css'
import { FaTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdMail } from  "react-icons/md";
import CCOneSendingM from './CCOneSendingM';


export default class CCSendingMessages extends Component {
    constructor(props){
        super(props);
       
}


    render() {
        let key=[1,2]; //key from map
        return (
            <div className="alSendingMessages">
               
          <CCOneSendingM index={key[0]}/>
          <CCOneSendingM index={key[1]}/>
           </div>
            
            
           
        );
    };
}



