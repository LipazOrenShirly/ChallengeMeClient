import React, { Component } from 'react';
import '../../../css/Style.css';
import ProjectContext from '../../../Context/ProjectContext';
import localHost from '../../LittleComponents/LocalHost';

export default class CCOneStudentChallenges extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
    }

    render() {
        const user = this.context;

        return (
            <div className="container-fluid">
                
                <div className="col-12 turkiz">{this.props.challenge.challengeName} </div>

            </div>
        )
    };
}

