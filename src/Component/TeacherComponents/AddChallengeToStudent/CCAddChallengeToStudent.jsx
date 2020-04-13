import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleAddChallengeToStudent.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import CConeSmartElementOffer from './CConeSmartElementOffer';

export default class CCAddChallengeToStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Smartchallenges: ["מראה חיבה לאנשים מוכרים", "משתמש בפעולות בכדי להראות שמחה או דאגה לאחרים", "מראה רצון לרצות אחרים", "להקשיב לסיפור לפחות 15 דקות", "מחקה תנועות פשוטות"]

        } 
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentScore';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
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
                return res.json();
            })
            .then(
                (result) => {
                    console.log("result= ", result);
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    getSmartOptID = (index) => { //מסיר אותו רק מהנראות, לא מהדאתא בייס, בכוונה
        var temp = this.state.Smartchallenges;
        if (index == 0)
            temp.splice(index, index + 1);
        else temp.splice(index, index);
        this.setState({ Smartchallenges: temp });
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="col-12 turkiz">יצירת אתגר לתלמיד</div>
                <br />
                <div className="titleSmartDiv"><strong>אתגרים שהוצעו ע"י המערכת בהתאם לאפיון</strong></div>
                <div className="col-12 DivAllSmart">
                    {/* get from server ChallengeID and put it instead of key when going to CConeSmartElementOffer */}
                    {
                        this.state.Smartchallenges.map((item, key) =>
                            <CConeSmartElementOffer item={item} index={key} studentID={this.props.studentID} SendSmartOptToAddChallenge={this.getSmartOptID} />
                        )}

                </div>

                <div className="titleSmartDiv"><strong>:אופציות נוספות</strong></div>
                <br />
                <div className="form-group col-12">
                    <button className="btn btn-info btnAddChallengeToStudent" onClick={() => this.props.history.push('/SearchChallenge', { studentID: this.props.studentID })}>חיפוש במאגר הגדול</button>
                </div>
                <div className="form-group col-12">
                    <button className="btn btn-info btnAddChallengeToStudent" onClick={() => this.props.history.push('/AddNewChallenge', { studentID: this.props.studentID })} >יצירת אתגר חדש</button>
                </div>


                <Footer></Footer>
            </div>
        );
    };
}



