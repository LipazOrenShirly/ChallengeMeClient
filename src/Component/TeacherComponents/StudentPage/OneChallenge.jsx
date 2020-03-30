import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';

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
            <div onClick = { () => this.props.goToEditChallenge(challenge) }>  
                <p>אתגר: {challenge.challengeName}</p>
                <p>קטגוריה: {challenge.categoryName}</p>
                <p>תאריך סיום: {challenge.deadline}</p>
                <p>רמת קושי: {challenge.difficulty}</p>
                <p>סטטוס: {challenge.status}</p>
            </div>
         );
    }
}
 
export default OneChallenge;