import React, { Component } from 'react';
import OneChallenge from './OneChallenge';
import localHost from '../../LittleComponents/LocalHost';
import './styleStudentPage.css';
import '../../../css/Style.css';

class Challenges extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            StudentChallenges: []
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount = () => {
        fetch(this.apiUrl + '?studentID='+this.props.studentID
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

    AddChallenge = () => {
        // מעבר לעמוד שבו בוחרים אתגר או משהו כזה
    }

    render() { 
        return ( 
            <div>
                <div className="textTilteChallStusent" dir="rtl">{this.state.StudentChallenges.length} האתגרים של התלמיד: </div>
                {this.state.StudentChallenges.map( (item,key) => 
                    <OneChallenge  index = {key+1} challenge = {item} goToEditChallenge = {this.props.goToEditChallenge} />
                    )}
                    <div className="col-12">
                <button className="btn btn-info btnYellow eddChallengeBTN" type="text" onClick={this.AddChallenge}>הוספת אתגר</button>
                </div></div>
         );
    }
}
 
export default Challenges;