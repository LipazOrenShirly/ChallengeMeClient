import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudentFeatures.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import $ from 'jquery';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


class CCStudentFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QueAndAnsArr: [],
            newFeature: null,
            tempArr: {}
        }
        let local = true;
        this.apiUrlFeaturesQuestion = 'http://localhost:' + { localHost }.localHost + '/api/FeaturesQuestion';
        this.apiUrlStudentFeatures = 'http://localhost:' + { localHost }.localHost + '/api/StudentFeatures';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount() {
        // //גט לשאלות
        // fetch(this.apiUrlFeaturesQuestion
        //     , {
        //         method: 'GET',
        //         headers: new Headers({
        //             'Content-Type': 'application/json; charset=UTF-8',
        //         })
        //     })
        //     .then(res => {
        //         console.log('res=', res);
        //         console.log('res.status', res.status);
        //         console.log('res.ok', res.ok);
        //         return res.json();
        //     })
        //     .then(
        //         (result) => {
        //             console.log("questionsArr= ", result);
        //             this.setState({ questionsArr: result })
        //         },
        //         (error) => {
        //             console.log("err get=", error);
        //         });

        // גט לשאלות והתשובות
        fetch(this.apiUrlStudentFeatures + '?studentID2=' + this.props.location.state.student.studentID
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
                    console.log("QueAndAnsArr= ", result);
                    console.log("QueAndAnsArr length= ", result.length);
                    this.setState({ QueAndAnsArr: result, newFeature: (result.length == 0 ? true : false) })
                
                },
                (error) => {
                    console.log("err get=", error);
                });


    }

    PostFeature = (event) => {
        // פקודת פוסט שמקבלת מערך של אובייקטים שכל אובייקט הוא תשובה לשאלה אחת
        const answers = [];  //מערך של התשובות
        // צריך איכשהו ליצור את המערך, אולי לעשות לולאה שתכניס אליו איברים
        const oneAnswer = {
            questionID: 1,
            studentID: 22,
            answer: 4
        }
        answers.push(oneAnswer);

        fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(answers),
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
                    console.log("fetch POST= ", result);
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'אפיינת את התלמיד בהצלחה!',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    });
                    this.props.history.push({
                        pathname: '/StudentPage',
                        state: { student: this.props.location.state.student }
                    });
                },
                (error) => {
                    console.log("err post=", error);
                });
        event.preventDefault();
    }

    PutFeature = (event) => {
        // פקודת פוט שמקבלת מערך של אובייקטים שכל אובייקט הוא תשובה לשאלה אחת
        const answers = [];  //מערך של התשובות
        // צריך איכשהו ליצור את המערך, אולי לעשות לולאה שתכניס אליו איברים
        const oneAnswer = {
            questionID: 1,
            studentID: 22,
            answer: 4
        }
        answers.push(oneAnswer);

        fetch(this.apiUrl, {
            method: 'PUT',
            body: JSON.stringify(answers),
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
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'אפיון הלמיד עודכן בהצלחה!',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    });
                    this.props.history.push({
                        pathname: '/StudentPage',
                        state: { student: this.props.location.state.student }
                    });
                },
                (error) => {
                    console.log("err post=", error);
                });
        event.preventDefault();
    }


    chooseAns = (e) => {
        // console.log(e.target.value);
        var NewAns = e.target.value.split(",");
        // console.log(x);
        this.setState({});
        this.state.QueAndAnsArr.map((item) => item.answer = (item.questionID == NewAns[3] ? parseInt(NewAns[1]) : item.answer))
        console.log(this.state.QueAndAnsArr);

    }


    render() {
        const { QueAndAnsArr } = this.state;
        return (
            <div className="container-fluid">
                <NavBar />
                <form onSubmit={this.state.newFeature ? this.PostFeature : this.PutFeature}>
                    <div className="turkiz">האפיון של {this.props.location.state.student.firstName} {this.props.location.state.student.lastName}</div>
                    <div className="scalaDetails" dir="rtl">1- הכי חלש, 5- הכי חזק</div>
                    <br/>
                    {
                        QueAndAnsArr.map((item, key) => 
                        <div  className={`classCategory${item.categoryID}`}>
                            <div className="textHeadlineNum" id={`que${item.questionID}`} >שאלה מספר {key+1} - שאלה בתחום ה{item.categoryName}</div>
                            <div><strong>{item.question}</strong></div>
                            <div>
                                <RadioGroup row aria-label="position" name="position" id={`ans${item.questionID}`} onChange={this.chooseAns} defaultValue="">
                                    <FormControlLabel
                                        value={`radio,1,ans,${item.questionID}`}
                                        control={<Radio color="secondary" />}
                                        label="1"
                                        checked={item.answer == 1 ? "true" : ""}
                                        labelPlacement="top"
                                        id={`radio,1,ans,${item.questionID}`}

                                    />
                                    <FormControlLabel
                                        value={`radio,2,ans,${item.questionID}`}
                                        control={<Radio color="secondary" />}
                                        label="2"
                                        checked={item.answer == 2 ? "true" : ""}
                                        labelPlacement="top"
                                        id={`radio,2,ans,${item.questionID}`}

                                    />
                                    <FormControlLabel
                                        value={`radio,3,ans,${item.questionID}`}
                                        control={<Radio color="secondary" />}
                                        label="3"
                                        checked={item.answer == 3 ? "true" : ""}
                                        labelPlacement="top"
                                        id={`radio,3,ans,${item.questionID}`}

                                    />
                                    <FormControlLabel
                                        value={`radio,4,ans,${item.questionID}`}
                                        control={<Radio color="secondary" />}
                                        label="4"
                                        checked={item.answer == 4 ? "true" : ""}
                                        labelPlacement="top"
                                        id={`radio,4,ans,${item.questionID}`}

                                    />
                                    <FormControlLabel
                                        value={`radio,5,ans,${item.questionID}`}
                                        control={<Radio color="secondary" />}
                                        label="5"
                                        checked={item.answer == 5 ? "true" : ""}
                                        labelPlacement="top"
                                        id={`radio,5,ans,${item.questionID}`}

                                    />
                                </RadioGroup>

                            </div>
                        </div>
                        )}

                    <button type="submit" style={{ marginBottom: '25px' }} className="btn btn-info col-12 btnYellow"> {this.state.newFeature ? "שמור אפיון" : "שמור עדכונים"} </button>

                </form>
                <Footer />

            </div>
        );
    }
}

export default CCStudentFeatures;