import React, { Component } from 'react';
import '../../../css/Style.css';
import ProjectContext from '../../../Context/ProjectContext';
import CCOneStudentChallenges from './CCOneStudentChallenges';
import localHost from '../../LittleComponents/LocalHost';

export default class CCStudentChallenges extends Component {

    constructor(props) {
        super(props);
        this.state = {
            StudentChallenges: [],
        };
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod'+ '/api/StudentChallenge';
        }
    }
    
    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
        fetch(this.apiUrl + '?studentID='+user.studentID
        , {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
        .then(res => {
            console.log('res=', res);
            console.log('res.status', res.status);
            console.log('res.ok', res.ok);
            return res.json();
        })
        .then(
            (result) => {
                console.log("Student Challenges= ", result);
                this.setState({StudentChallenges: result});
            },
            (error) => {
                console.log("err get=", error);
            });
    }
  
    render() {
        const user = this.context;

        return (
            <div >
                <br/>
                <div className="col-12 btnMassagesReadText">:האתגרים שלי</div><br />
                <div className="challengeShowStudents">
                {this.state.StudentChallenges.map( (item, key) => 
                    <CCOneStudentChallenges countChallenges={this.state.StudentChallenges.length} challenge={item} index={key} goToChallengePage = {this.props.goToChallengePage} />
                )}
</div>
            </div>
        )
    };
}

