import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleMessages.css'
import { FaTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdMail } from  "react-icons/md";
import CCOneIncomeMessage from './____CCOneIncomeMessage';


export default class CCIncomeMessages extends Component {
    constructor(props){
        super(props);
       
}


    render() {
        let key=[1,2]; //key from map
        return (
            <div className="allIncomeMessages">
               
          <CCOneIncomeMessage index={key[0]}/>
          <CCOneIncomeMessage index={key[1]}/>
           </div>
            
            
           
        );
    };
}



