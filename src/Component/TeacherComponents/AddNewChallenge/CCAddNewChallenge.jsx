import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAddNewChallenge.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import { TiArrowBack } from 'react-icons/ti';
import ChipsArray from './ChipsArray';
import { IoMdCheckmark } from "react-icons/io";
import FreeSoloTags from '../../LittleComponents/FreeSoloTags';
import FreeSolo from '../../LittleComponents/FreeSolo';
import Swal from 'sweetalert2';
import Checkbox from '@material-ui/core/Checkbox';
import localHost from '../../LittleComponents/LocalHost';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import $ from 'jquery';

export default class CCAddNewChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challengesArr: [],
            tagsArr: [],
            NewChallengeName: "",
            chosenTagsID: [],
            newChallenge: {},
            showTags: false,
            isPrivate: false,
            valueEmotional: 0,
            valueSocial: 0,
            valueSchool: 0,
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Challenge';
        this.apiUrlTags = 'http://localhost:' + { localHost }.localHost + '/api/Tag';
        this.apiUrlChallengeTag = 'http://localhost:' + { localHost }.localHost + '/api/ChallengeTag';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Challenge';
            this.apiUrlTags = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Tag';
            this.apiUrlChallengeTag = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/ChallengeTag';
        }

    }

    componentDidMount() {
        this.getChallenges();
        this.getTags();
    }

    getChallenges = () => {
        fetch(this.apiUrl + "?studentID=" + this.props.location.state.studentID
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
                    console.log("challengesArr= ", result);
                    this.setState({ challengesArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });
    }

    getTags = () => {
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("tagsArr= ", result);
                    this.setState({ tagsArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });
    }

    continueToTags = (e) => {
        e.preventDefault();
        if ($('#NewChallengeName').val() == "") {
            //תוקן
            Swal.fire({
                title: 'שים לב',
                text: 'על האתגר אסור להשאר ריק',
                icon: 'warning',
                confirmButtonColor: '#e0819a',
            })
            return;
        }

        var inputNameChallenge = $('#NewChallengeName').val();
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("challenge= ", result[0]);
                    returnChallenge = result[0];
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                })
            .then(() => {
                if (returnChallenge != null) {
                    //תוקן
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
                                pathname: '/ExtraChallengeDetails',
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

    onTagsChange = (event, values) => {
        var tagsID = values.map(value => value.tagID);
        console.log(tagsID);
        this.setState({ chosenTagsID: tagsID });
    }

    Submit = (event) => {
        event.preventDefault();

        //ולידציות
        if (this.state.chosenTagsID.length == 0) {
            $('#TagsValuesError').empty();
            $('#TagsValuesError').append("חייב להוסיף לפחות תגית אחת");
            return;
        }
        else {
            $('#TagsValuesError').empty();
        }
        if ($('#DifLevelInput').val() == "") {
            $('#DifLevelError').empty();
            $('#DifLevelError').append("חייב למלא את רמת הקושי של האתגר");
            return;
        }
        else {
            $('#DifLevelError').empty();
        }
        if (this.state.valueEmotional == 0 && this.state.valueSchool == 0 && this.state.valueSocial == 0) {
            $('#DifValuesError').empty();
            $('#DifValuesError').append("חייב להביא אחוזים ללפחות ערך אחד מהשלושה");
            return;
        }
        else {
            $('#DifValuesError').empty();
        }
        this.postChallenge();
    }

    postChallenge = () => {
        // בניית אובייקט אתגר שישלח בפקודת פוסט
        const challenge = {
            challengeName: $('#NewChallengeName').val(),
            isPrivate: this.state.isPrivate,
            social: this.state.valueSocial,
            school: this.state.valueSchool,
            emotional: this.state.valueEmotional,
            difficulty: $('#DifLevelInput').val(),
            studentID: this.props.location.state.studentID
        }
        console.log(JSON.stringify(challenge));

        //פקודת פוסט לאתגר החדש שמחזירה את האובייקט של האתגר שנוצר ומעבירה אותו לעמוד הבא
        fetch(this.apiUrl,
            {
                method: 'POST',
                body: JSON.stringify(challenge),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8'
                })
            })
            .then(res => {
                console.log('res=', res);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result[0]);
                    this.setState({ newChallenge: result[0] }); // שמירת האתגר שנוצר בדאטה בייס בסטייט
                    this.postChallengeTags();
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'אוי',
                        text: 'האתגר לא נשמר, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    postChallengeTags = () => {
        const ChallengeTag = [];
        this.state.chosenTagsID.map((tag) =>    //בניית מערך של תגיות של אתגרים שיתאים למחלקה כדי לשלוח בפקודת פוסט
            ChallengeTag.push({
                challengeID: this.state.newChallenge.challengeID,
                tagID: tag
            })
        );
        console.log(ChallengeTag);

        fetch(this.apiUrlChallengeTag, {    //פקודת פוסט לטבלת תגיות של אתגרים לפי התגיות שנבחרו 
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
                    console.log("fetch PUT= ", result);
                    //תוקן
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'הוספת את האתגר בהצלחה!',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    });
                    this.props.history.push({
                        pathname: '/ExtraChallengeDetails',
                        state: {
                            challenge: this.state.newChallenge,
                            studentID: this.props.location.state.studentID
                        }
                    });
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'המערכת לא הצליחה להוסיף את האתגר, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
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

    onInputChange = (event, value) => {
        this.setState({ NewChallengeName: value })
    }

    render() {
        const { valueEmotional, valueSocial, valueSchool } = this.state;
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">יצירת אתגר חדש</div>
                <br />
                <form onSubmit={this.Submit}>
                    <div className="form-group col-12 bc" dir="rtl">
                        <FreeSolo
                            options={this.state.challengesArr.map((option) => option.challengeName)}
                            onInputChange={this.onInputChange}
                            label='שם האתגר'
                            id='NewChallengeName' />
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
                                <FreeSoloTags tags={this.state.tagsArr} onTagsChange={this.onTagsChange} />
                                <div className='errorInput' id="TagsValuesError"></div>
                            </div>

                            {/* <ChipsArray TagsArray={this.state.arr} SendNewArrToAddNewChallenge={this.getNewArrAfterDelete} /> */}

                            <div className="purpule"><strong>:רמת קושי האתגר</strong></div>
                            <div className="col-12 input-group mb-3">
                                <select className="form-control inputCCEdit" id="DifLevelInput">
                                    <option value="" >..בחר</option>
                                    <option value="1" >1</option>
                                    <option value="2" >2</option>
                                    <option value="3" >3</option>
                                    <option value="4" >4</option>
                                    <option value="5" >5</option>
                                </select>
                            </div>
                            <div className='errorInput' id="DifLevelError"></div>
                            <div style={{ textAlign: 'right', paddingRight: '15px' }}>בחר כמה אחוזים מכל נושא אתה חושב שהאתגר מתאים</div>
                            <div className="col-12" >
                                <div className="titleTypeAddChallenge">רגשי</div>
                                <Slider
                                    value={valueEmotional}
                                    min={0}
                                    step={1}
                                    max={100}
                                    scale={(x) => x}
                                    onChange={(e, newVal) => this.setState({ valueEmotional: newVal })}
                                    valueLabelDisplay="auto"
                                />
                                <div className="titleTypeAddChallenge">חברתי</div>
                                <Slider
                                    value={valueSocial}
                                    min={0}
                                    step={1}
                                    max={100}
                                    scale={(x) => x}
                                    onChange={(e, newVal) => this.setState({ valueSocial: newVal })}
                                    valueLabelDisplay="auto"
                                />
                                <div className="titleTypeAddChallenge">לימודי</div>
                                <Slider
                                    value={valueSchool}
                                    min={0}
                                    step={1}
                                    max={100}
                                    scale={(x) => x}
                                    onChange={(e, newVal) => this.setState({ valueSchool: newVal })}
                                    valueLabelDisplay="auto"
                                />

                            </div>
                            <div className='errorInput' id="DifValuesError"></div>

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
            </div>
        );
    };
}



