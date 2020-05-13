import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import './styleStudentPage.css';
import '../../../css/Style.css';
import $ from 'jquery';
import Swal from 'sweetalert2';


class CCOneChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Challenge';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod'+ '/api/Challenge';
        }
     
        
    }

    componentDidMount() {
       
  
        
    }
    
    render() { 
        const challenge = this.props.challenge;
        const classDiv="oneChallengeDiv status"+this.props.challenge.status;
        const deadline = new Date(challenge.deadline);
        const today = new Date();
        const dateDiff = parseInt((deadline - today) / (1000 * 60 * 60 * 24), 10);
        var statusSentence = challenge.status != 0 ? "" : 
        dateDiff > 30 ? <div className="deadlineDiv">תאריך סיום: {challenge.deadline}</div> :
        <div className="remainDaysDiv">נותרו {dateDiff} ימים לסיום האתגר</div> 
           
         

        return ( 
            <div  className={classDiv} onClick = { () => this.props.goToEditChallenge(challenge) }>  
                <div className="oneChallengeDetails"><strong>אתגר {this.props.index}:</strong> {challenge.challengeName}</div>
                {statusSentence}               
            </div>
         );
    }
}
 
export default CCOneChallenge;