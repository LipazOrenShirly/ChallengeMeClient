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
            newFeature: false,
        }
        let local = true;
        this.apiUrlFeaturesQuestion = 'http://localhost:' + { localHost }.localHost + '/api/FeaturesQuestion';
        this.apiUrlStudentFeatures = 'http://localhost:' + { localHost }.localHost + '/api/StudentFeatures';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount() {
        console.log( this.props.location.state.student.studentID);
        // גט לשאלות והתשובות
        

        console.log(this.props.location.state.student);
        
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
                    console.log("QueAndAnsArr= ");
                    console.log(result)
                    console.log("QueAndAnsArr length= ", result.length);
                    this.setState({ QueAndAnsArr: result, newFeature: (result[0].answer == null ? true : false) })
                    console.log("אפיון חדש" + this.state.newFeature);
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    PostPutFeature = (event) => {
        const answers = this.state.QueAndAnsArr.map( (item) => {
            return {
                questionID: item.questionID,
                studentID: this.props.location.state.student.studentID,
                answer: item.answer
            }
        });
            
        console.log(answers); 
        console.log(this.state.newFeature); 

        fetch(this.apiUrlStudentFeatures, {
            method: this.state.newFeature ? 'POST' : 'PUT',
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
                    console.log("fetch POST/PUT= ", result);
                    Swal.fire({
                        title: 'מעולה!',
                        text: this.state.newFeature ? 'אפיינת את התלמיד בהצלחה!' : 'עדכון האפיון בוצע בהצלחה',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    });
                    this.props.history.push({
                        pathname: '/StudentPage',
                        state: { student: this.props.location.state.student }
                    });
                },
                (error) => {
                    console.log("err post/put=", error);
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
                <form onSubmit= {this.PostPutFeature}>
                    <div className="turkiz">האפיון של {this.props.location.state.student.firstName} {this.props.location.state.student.lastName}</div>
                    <div className="scalaDetails" dir="rtl">1- הכי חלש, 5- הכי חזק</div>
                    <br />
                    {
                        QueAndAnsArr.map((item, key) =>
                            <div key={item.questionID} className={`classCategory${item.categoryID}`}>
                                <div className="textHeadlineNum" id={`que${item.questionID}`} >שאלה מספר {key + 1} - שאלה בתחום ה{item.categoryName}</div>
                                <div><strong>{item.question}</strong></div>
                                <div>
                                    <RadioGroup row aria-label="position" name="position" id={`ans${item.questionID}`} onChange={this.chooseAns} defaultValue="">
                                        <FormControlLabel
                                            value={`radio,1,ans,${item.questionID}`}
                                            control={<Radio color="secondary" />}
                                            label="1"
                                            checked={(item.answer == 1 ? true : null)}
                                            labelPlacement="top"
                                            id={`radio,1,ans,${item.questionID}`}

                                        />
                                        <FormControlLabel
                                            value={`radio,2,ans,${item.questionID}`}
                                            control={<Radio color="secondary" />}
                                            label="2"
                                            checked={(item.answer == 2 ? true : null)}
                                            labelPlacement="top"
                                            id={`radio,2,ans,${item.questionID}`}

                                        />
                                        <FormControlLabel
                                            value={`radio,3,ans,${item.questionID}`}
                                            control={<Radio color="secondary" />}
                                            label="3"
                                            checked={(item.answer == 3 ? true : null)}
                                            labelPlacement="top"
                                            id={`radio,3,ans,${item.questionID}`}

                                        />
                                        <FormControlLabel
                                            value={`radio,4,ans,${item.questionID}`}
                                            control={<Radio color="secondary" />}
                                            label="4"
                                            checked={(item.answer == 4 ? true : null)}
                                            labelPlacement="top"
                                            id={`radio,4,ans,${item.questionID}`}

                                        />
                                        <FormControlLabel
                                            value={`radio,5,ans,${item.questionID}`}
                                            control={<Radio color="secondary" />}
                                            label="5"
                                            checked={(item.answer == 5 ? true : null)}
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