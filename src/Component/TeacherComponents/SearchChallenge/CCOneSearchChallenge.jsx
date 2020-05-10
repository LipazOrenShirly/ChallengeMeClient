import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleSearchChallenge.css';
import localHost from '../../LittleComponents/LocalHost';
//import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'


export default class CCOneSearchChallenge extends Component {
    constructor(props) {
        super(props);
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod'+ '/api/Class';
            
        }
    }

    render() {
        return (
            <div className="DivOneTagsSearch col-12" dir="rtl" >               
                <span className="col-10 oneTagsSearchText" onClick={() => this.props.GoToExtraDetailPage(this.props.challenge)}>{this.props.challenge.challengeName}</span>
                <br/>
            </div>
        );
    };
}