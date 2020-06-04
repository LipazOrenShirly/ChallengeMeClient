import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudenTtransfer.css';
// import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';


export default class oneTransfer extends Component {
    constructor(props) {
        super(props);
        // let local = false;
        // this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        // if (!local) {
        //     this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod'+ '/api/Class';
            
        // }
    }

    render() {
        return (
            <div className="col-12 transferStudendDivOne" dir="rtl" >               
                <span className="col-10" >אורית רוצה לשייך לך את בני ברוכים</span>
                <br/>
            </div>
        );
    };
}