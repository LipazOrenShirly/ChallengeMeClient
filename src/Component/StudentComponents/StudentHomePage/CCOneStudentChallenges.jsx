import React, { Component } from 'react';
import '../../../css/Style.css';
import ProjectContext from '../../../Context/ProjectContext';
import localHost from '../../LittleComponents/LocalHost';

export default class CCOneStudentChallenges extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backColor:['rgb(173,239,25)','rgb(243,248,87)','rgb(253,213,55)','rgb(242,184,155)'
            ,'rgb(201,158,168)','rgb(245,147,145)','rgb(253,112,93)','rgb(32,192,217)','rgb(27,135,215)'],
        };
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
    }

    render() {
        const user = this.context;
        
        return (
            <div className={this.props.index +" d-flex align-items-center justify-content-center oneDiv"} style={{backgroundColor:this.state.backColor[(this.props.index)%9]}}>               
                <div className="col-12 challengeReadText"  onClick={ () => this.props.goToChallengePage(this.props.challenge)} >{this.props.challenge.challengeName} </div>
            </div>
        )
    };
}

