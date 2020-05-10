import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleAddChallengeToStudent.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import CConeSmartElementOffer from './CConeSmartElementOffer';
import { TiArrowBack } from 'react-icons/ti';
import Swal from 'sweetalert2';


export default class CCAddChallengeToStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Smartchallenges: [],

        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentScore';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentScore';
        }
    }

    componentDidMount() {
        fetch(this.apiUrl + '?studentID=' + this.props.location.state.studentID
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
                    console.log("result= ", result);
                    //סינון מהתאגרים המומלצים את האתגרים שכבר שוייכו לילד ואז שמירה בסטייט
                    const StudentChallenges = this.props.location.state.StudentChallenges;
                    const StudentChallenges_ID = StudentChallenges.map(item => item.challengeID);
                    const Smartchallenges = result.filter(item => !StudentChallenges_ID.includes(item.challengeID));
                    this.setState({ Smartchallenges: Smartchallenges });
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

    getSmartOptID = (index) => { //מסיר אותו רק מהנראות, לא מהדאתא בייס, בכוונה
        var temp = this.state.Smartchallenges;
        if (index == 0)
            temp.splice(index, 1);
        else temp.splice(index, 1);
        this.setState({ Smartchallenges: temp });
    }

    GoToExtraDetailsPage = (challenge) => {
        this.props.history.push({
            pathname: '/ExtraChallengeDetails',
            state: {
                challenge: challenge,
                studentID: this.props.location.state.studentID
            }
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">יצירת אתגר לתלמיד</div>


                <div className="titleSmartDiv"><strong>אתגרים שהוצעו ע"י המערכת בהתאם לאפיון</strong></div>
                <div className="col-12 DivAllSmart">
                    {/* get from server ChallengeID and put it instead of key when going to CConeSmartElementOffer */}
                    {
                        this.state.Smartchallenges.map((item, key) =>
                            <CConeSmartElementOffer challenge={item} index={key} key={item.challengeID} studentID={this.props.location.state.studentID}
                                SendSmartOptToAddChallenge={this.getSmartOptID} GoToExtraDetailsPage={this.GoToExtraDetailsPage} />
                        )}

                </div>

                <div className="titleSmartDiv"><strong>:אופציות נוספות</strong></div>
                <br />
                <div className="form-group col-12">
                    <button className="btn btn-info btnAddChallengeToStudent" onClick={() => this.props.history.push('/SearchChallenge', { studentID: this.props.location.state.studentID })}>חיפוש במאגר הגדול</button>
                </div>
                <div className="form-group col-12">
                    <button className="btn btn-info btnAddChallengeToStudent" onClick={() => this.props.history.push('/AddNewChallenge', { studentID: this.props.location.state.studentID })} >יצירת אתגר חדש</button>
                </div>


                <Footer></Footer>
            </div>
        );
    };
}



