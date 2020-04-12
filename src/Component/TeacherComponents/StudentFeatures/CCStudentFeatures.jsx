import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import $ from 'jquery';

class CCStudentFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionsArr: [],
            answerArr: [],
            newFeature: null,
        }
        let local = true;
        this.apiUrlFeaturesQuestion = 'http://localhost:' + { localHost }.localHost + '/api/FeaturesQuestion';
        this.apiUrlStudentFeatures = 'http://localhost:' + { localHost }.localHost + '/api/StudentFeatures';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount() {
        //גט לשאלות
        fetch(this.apiUrlFeaturesQuestion
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
                    console.log("questionsArr= ", result);
                    this.setState({ questionsArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                });
        
        // גט לתשובות
        fetch(this.apiUrlStudentFeatures + '?studentID=' + this.props.location.state.student.studentID
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
                    console.log("answerArr= ", result);
                    console.log("answerArr length= ", result.length);
                    this.setState({ answerArr: result, newFeature: (result.length == 0 ? true : false) })
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

    render() {
        return (
            <div className="container-fluid">
                <NavBar />
                <form onSubmit={this.state.newFeature ? this.PostFeature : this.PutFeature}>

                    <button> {this.state.newFeature ? "שמור אפיון" : "שמור עדכונים"} </button>

                </form>
                <Footer />

            </div>
        );
    }
}

export default CCStudentFeatures;