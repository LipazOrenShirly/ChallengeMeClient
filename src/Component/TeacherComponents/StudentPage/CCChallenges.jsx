import React, { Component } from 'react';
import CCOneChallenge from './CCOneChallenge';
import localHost from '../../LittleComponents/LocalHost';
import './styleStudentPage.css';
import '../../../css/Style.css';
import { FaCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';


class CCChallenges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentChallenges: []
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
        }

    }

    componentDidMount() {
        fetch(this.apiUrl + '?studentID=' + this.props.studentID
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("Student Challenges= ", result);
                    this.setState({ StudentChallenges: result });
                },
                (error) => {
                    console.log("err get=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    AddChallenge = () => {
        this.props.SendDataToStudentPage(this.props.studentID, this.state.StudentChallenges);
    }

    render() {
        var NumOfChallenge = this.state.StudentChallenges.length;
        return (
            <div>
                <div className="col-12">
                    <button className="btn btn-info btnPink eddChallengeBTN" type="text" onClick={this.AddChallenge}>הוספת אתגר</button>
                </div>
                {
                    NumOfChallenge == 0 ? <div className="textTilteChallStusentZeroChallenges" dir="rtl">עדיין לא שויכו לתלמיד זה אתגרים<div className="sadSmileyDiv col-12"><img className="sadSmileyImg" src={require('../../../img/sadSmiley.png')}/></div> כדי להתחיל בתהליך עלייך להוסיף לילד אתגרים </div> : <div className="textTilteChallStusent" dir="rtl">{this.state.StudentChallenges.length} האתגרים של התלמיד: </div>
                }
                {
                    NumOfChallenge != 0 &&

                    <div className="row iconsCircle">
                        <div className="col-4 oneIconCircle">  צריך עזרה
               <FaCircle className="iconStatus3"></FaCircle>
                        </div>
                        <div className="col-4 oneIconCircle">  לא הצליח
               <FaCircle className="iconStatus2"></FaCircle>
                        </div>
                        <div className="col-4 oneIconCircle">  הצליח
               <FaCircle className="iconStatus1"></FaCircle>
                        </div>
                    </div>
                }


                <div className="studentChallengesDiv">
                    {this.state.StudentChallenges.map((item, key) =>
                        <CCOneChallenge key={key} index={key + 1} challenge={item} goToEditChallenge={this.props.goToEditChallenge} />
                    )}
                </div>

            </div>
        );
    }
}

export default CCChallenges;