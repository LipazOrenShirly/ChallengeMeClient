import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import ProjectContext from '../../../Context/ProjectContext';
import CCStudentChallenges from './CCStudentChallenges';

export default class CCStudentHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    static contextType = ProjectContext;
  
    goToChallengePage = (challenge) => {
        this.props.history.push({
            pathname: '/ChallengePage',
            state: { challenge: challenge }
        })
    }

    render() {
        const user = this.context;

        return (
            <div className="container-fluid">
                <NavBar></NavBar><br /><br />
                
                <CCStudentChallenges goToChallengePage = {this.goToChallengePage}/>

                <Footer></Footer>
            </div>
        )
    };
}

