import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import './styleStudentPage.css';
import '../../../css/Style.css';


class OneChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Challenge';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount() {
    }
    
    render() { 
        const challenge = this.props.challenge;
        return ( 
            <div className="oneChallengeDiv" onClick = { () => this.props.goToEditChallenge(challenge) }>  
                <div className="oneChallengeDetails"><strong>אתגר {this.props.index}:</strong> {challenge.challengeName}</div>
                <div>קטגוריה: {challenge.categoryName}</div>
                <div>תאריך סיום: {challenge.deadline}</div>
                <div>רמת קושי: {challenge.difficulty}</div>
                <div>סטטוס: {challenge.status}</div>
            </div>
         );
    }
}
 
export default OneChallenge;