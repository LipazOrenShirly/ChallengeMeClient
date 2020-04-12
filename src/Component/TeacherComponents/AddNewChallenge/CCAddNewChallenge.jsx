import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAddNewChallenge.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import { TiArrowBack } from 'react-icons/ti';
import ChipsArray from './ChipsArray';
import { IoMdCheckmark } from "react-icons/io";
import FreeSoloTags from './FreeSoloTags';
import FreeSolo from './FreeSolo';
import Swal from 'sweetalert2';
import Checkbox from '@material-ui/core/Checkbox';
import localHost from '../../LittleComponents/LocalHost';

import $ from 'jquery';

export default class CCAddNewChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challengesArr: [],
            tagsArr: [],
            newChallenge: {},
            showTags: false,
            isPrivate: false,
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Challenge';
        this.apiUrlTags = 'http://localhost:' + { localHost }.localHost + '/api/Tag';
        this.apiUrlChallengeTag = 'http://localhost:' + { localHost }.localHost + '/api/ChallengeTag';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }

    }
    componentDidMount() {
        fetch(this.apiUrl
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
                    console.log("challengesArr= ", result);
                    this.setState({ challengesArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                });

        fetch(this.apiUrlTags
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
                    console.log("tagsArr= ", result);
                    this.setState({ tagsArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    continueToTags = (e) => {
        e.preventDefault();
        if ($('#NewChallengeName').val() == "") {
            Swal.fire({
                title: 'שים לב',
                text: 'על האתגר אסור להשאר ריק',
                icon: 'warning',
                confirmButtonColor: '#e0819a',
            })
            return;
        }

        var inputNameChallenge = $('#NewChallengeName').val();
        console.log(inputNameChallenge);
        var returnChallenge = null;
        //פקודת גט שבודקת אם האינפוט שהוא בחר נמצא בשרת או לא 
        fetch(this.apiUrl + '?challengeName=' + inputNameChallenge
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
                    console.log("challenge= ", result[0]);
                    returnChallenge = result[0];
                },
                (error) => {
                    console.log("err get=", error);
                })
            .then(() => {
                if (returnChallenge != null) {
                    Swal.fire({
                        title: 'שים לב',
                        text: "כבר קיים אתגר כזה במאגר, בלחיצה על אישור תבחר באתגר זה להיות האתגר של הילד",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#e0819a',
                        cancelButtonColor: '#867D95',
                        cancelButtonText: 'בטל',
                        confirmButtonText: 'כן, בחר'
                    }).then((result) => {
                        if (result.value) {  //אם בחר אישור
                            this.props.history.push({  //תעבור לדף שאחרי שבוחרים את האתגר מגיעים אליו
                                pathname: '/ExtraStudentDetails',
                                state: { challenge: returnChallenge }
                            });
                        }
                        else {    //אם בחר בטל
                            $('#NewChallengeName').val("");
                        }
                    })
                }
                else {
                    this.setState({ showTags: true });
                    $('#NewChallengeName').prop('disabled', true);
                    $('.bc').css('background-color', 'rgba(202, 199, 199, 0.07)');
                }
            });

    }

    handleChange = (event) => {
        this.setState(prevState => ({ isPrivate: !prevState.isPrivate }));

    };

    Submit = (event) => {
        //פקודת פוסט לאתגר החדש שמחזירה את האובייקט של האתגר שנוצר ומעבירה אותו לעמוד הבא
        const challenge = {
            challengeName: 'אתגר דוגמה'
            // challemgeName:  $('#NewChallengeName').val(),
            // isPrivate: this.state.isPrivate,
            // social: $('#social').val(),
            // school: $('#school').val(),
            // emotional: $('#emotional').val()
        }
        console.log('challenge = ' + challenge);
        
        fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(challenge),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result[0]);
                    this.setState({ newChallenge: result[0] });
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'הוספת את האתגר בהצלחה!',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    });
                    this.props.history.push({
                        pathname: '/ExtraChallengeDetails',
                        state: { challenge: this.state.newChallenge }
                    });
                },
                (error) => {
                    console.log("err post=", error);
                });

        const ChallengeTag = [{
            //מערך של תגיות של אתגרים
        }];
        
        fetch(this.ChallengeTag, {
            method: 'POST',
            body: JSON.stringify(ChallengeTag),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result[0]);
                    this.setState({ newChallenge: result[0] });
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'הוספת את האתגר בהצלחה!',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    });
                    this.props.history.push({
                        pathname: '/ExtraChallengeDetails',
                        state: { challenge: this.state.newChallenge }
                    });
                },
                (error) => {
                    console.log("err post=", error);
                });
        event.preventDefault();
    }


    //לא למחוק את זה אולי עוד אעשה תגיותת יפות בהמשך חחח:
    // getNewArrAfterDelete = (data) => {
    //     this.setState({ arr: data })
    // }
    // get=(data)=>{
    //     // let x= $('#NewRelatedTags').val();
    //     let tempArr= this.state.arr;
    //     tempArr.push(data);
    //     this.setState({arr:tempArr})
    //     // $('#NewRelatedTags').val("");
    // }



    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">יצירת אתגר חדש</div>
                <br />
                <form onSubmit={this.Submit}>
                    <div className="form-group col-12 bc" dir="rtl">
                        <FreeSolo challenges={this.state.challengesArr} />
                    </div>
                    {
                        this.state.showTags == false &&
                        <div className="form-group col-12">
                            <button className="btn btn-info createNewChallenge" onClick={this.continueToTags}>המשך</button>
                        </div>
                    }
                    {
                        this.state.showTags == true &&
                        <div>
                            <div className="form-group input-group col-12 bc" dir="rtl">
                                <FreeSoloTags tags={this.state.tagsArr} />
                            </div>

                            {/* <ChipsArray TagsArray={this.state.arr} SendNewArrToAddNewChallenge={this.getNewArrAfterDelete} /> */}

                            <div>בחר כמה אחוזים מכל נושא אתה חושב שהאתגר מתאים</div>
                            <div className="col-12" >
                                <input type="number" id="emotional" style={{ textAlign: "center" }} className="form-control inputNewTeacher" placeholder="רגשי" min="1" max="100"></input>
                                <input type="number" id="social" style={{ textAlign: "center" }} className="form-control inputNewTeacher" placeholder="חברתי" min="1" max="100"></input>
                                <input type="number" id="school" style={{ textAlign: "center" }} className="form-control inputNewTeacher" placeholder="לימודי" min="1" max="100"></input>
                            </div>
                            <div dir="rtl" >
                                <Checkbox
                                    checked={this.state.checked}
                                    id="isPrivate"
                                    onChange={this.handleChange}
                                    value="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                               האם לשמור במאגר הגדול או שזה ספיציפי לתלמיד הזה
                            </div>
                            <br />
                            <div className="form-group col-12">
                                <button className="btn btn-info createNewChallenge">יצירת האתגר</button>
                            </div>
                        </div>
                    }
                </form>
                <Footer></Footer>
            </div>
        );
    };
}



