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
        fetch()
    }
    
    render() { 
        const challenge = this.props.challenge;

        return ( 
            <div onClick = { this.props.goToEditChallenge(challenge) }>
                {challenge.difficulty}
                {challenge.deadline}
                {challenge.Status}
                {challenge.challengeName}
                {challenge.categoryName}
            </div>
         );
    }
}
 
export default OneChallenge;