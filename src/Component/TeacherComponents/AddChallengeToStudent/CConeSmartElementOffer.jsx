import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAddChallengeToStudent.css';
import localHost from '../../LittleComponents/LocalHost';
//import { FaTrashAlt } from "react-icons/fa";
import { MdClose } from  "react-icons/md";
import Swal from 'sweetalert2'


export default class CCOneClass extends Component {
    constructor(props) {
        super(props);
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    
    deleteOption=()=>{
        this.props.SendSmartOptToAddChallenge(this.props.index);
    }
    

    render() {
        return (
            <div className="DivOneSmart col-12" dir="rtl" >
                
                <MdClose className="col-2 closeIcon floatCrossIcon" onClick={this.deleteOption}/>
                <span className="col-10 oneSmartText" onClick={() => this.props.GoToExtraDetailsPage(this.props.challenge)}>{this.props.challenge.challengeName}</span>
                <br/>
            </div>
        );
    };
}