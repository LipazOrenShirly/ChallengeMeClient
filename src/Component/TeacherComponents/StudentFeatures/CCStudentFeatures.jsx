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
import { TiArrowBack } from 'react-icons/ti';
import FullWidthTsabs from './FullWidthTabs';

class CCStudentFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QueAndAnsArr: [],
            emotionalArr: [],
            socialArr: [],
            schoolArr: [],
            newFeature: false,
            didChange: false,
        }
        let local = false;
        this.apiUrlFeaturesQuestion = 'http://localhost:' + { localHost }.localHost + '/api/FeaturesQuestion';
        this.apiUrlStudentFeatures = 'http://localhost:' + { localHost }.localHost + '/api/StudentFeatures';
        if (!local) {
            this.apiUrlFeaturesQuestion = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/FeaturesQuestion';
            this.apiUrlStudentFeatures = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentFeatures';
        }
    }

    componentDidMount() {
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result.emotional);
                    // console.log(result.social);
                    // console.log(result.school);
                    this.setState({ 
                        emotionalArr: result.emotional,
                        socialArr: result.social,
                        schoolArr: result.school,
                        QueAndAnsArr: result, 
                        newFeature: (result.emotional[0].answer == null ? true : false) });
                    console.log("אפיון חדש" + this.state.newFeature);
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'טעינת הדף לא עבדה כראוי, אנא טען מחדש את העמוד',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    });
                });
    }

    PostPutFeature = (event) => {
        event.preventDefault();

        var allFilled = true;
        var allArr = [...this.state.emotionalArr, ...this.state.socialArr, ...this.state.schoolArr];
        console.log(allArr);
        allArr.map((item) => {
            if (!(item.answer >= 1 && item.answer <= 5)) {
                //תוקן
                Swal.fire({
                    title: 'שים לב!',
                    text: 'צריך שכל השדות יהיו ממולאים',
                    icon: 'warning',
                    confirmButtonColor: '#e0819a',
                });
                allFilled = false
            }
        });
        if (allFilled == false)
            return;
        const answers = allArr.map((item) => {
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch POST/PUT= ", result);
                    //תוקן
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
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'האפיון לא עודכן, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    chooseAns = (e) => {
        var NewAns = e.target.value.split(",");
        this.setState({ didChange: true });
        // this.state.QueAndAnsArr.map((item) => item.answer = (item.questionID == NewAns[3] ? parseInt(NewAns[1]) : item.answer));
        this.state.emotionalArr.map((item) => item.answer = (item.questionID == NewAns[3] ? parseInt(NewAns[1]) : item.answer));
        this.state.socialArr.map((item) => item.answer = (item.questionID == NewAns[3] ? parseInt(NewAns[1]) : item.answer));
        this.state.schoolArr.map((item) => item.answer = (item.questionID == NewAns[3] ? parseInt(NewAns[1]) : item.answer));
        // console.log(this.state.QueAndAnsArr);
    }

    goBack = () => {
        if (this.state.didChange == false) {  //אם נכנס למסך אפיון תלמיד לחץ על החץ חזור אחורה אבל לא עשה שינויים
            window.history.back();
        }
        else {  // אם כן עשה שינויים
            //תוקן
            Swal.fire({
                title: 'שים לב',
                text: "בלחיצה על כפתור זה תחזור אחורה וכל השינויים שעשית לא יישמרו",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e0819a',
                cancelButtonColor: '#867D95',
                cancelButtonText: 'בטל',
                confirmButtonText: 'כן, חזור'
            }).then((result) => {
                if (result.value) {  //אם בחר אישור
                    window.history.back();
                }
            });
        }
    }

    render() {
        const { QueAndAnsArr } = this.state;
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={this.goBack} size={40} />
                </div>
                <form onSubmit={this.PostPutFeature}>
                    <div className="turkiz">האפיון של {this.props.location.state.student.firstName} {this.props.location.state.student.lastName}</div>
                    <div className="scalaDetails" dir="rtl">1- הכי חלש, 5- הכי חזק</div>
                    <br />
                    <FullWidthTsabs 
                        emotionalArr={this.state.emotionalArr}
                        socialArr={this.state.socialArr}
                        schoolArr={this.state.schoolArr}
                        chooseAns={this.chooseAns}
                    />

                    {/* {
                        QueAndAnsArr.map((item, key) =>
                            <div key={item.questionID} className={`classCategory${item.categoryID}`}>
                                <div className="textHeadlineNum" id={`que${item.questionID}`} >שאלה מספר {key + 1} - שאלה בתחום ה{item.categoryName}</div>
                                <div><strong>{item.question}</strong></div>
                                <div>
                                    <RadioGroup row aria-label="position" className="justify-content-between" name="position" id={`ans${item.questionID}`} onChange={this.chooseAns} defaultValue="">
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
                        )} */}
                    <button type="submit" style={{ marginBottom: '8px' }} className="btn btn-info col-12 btnPink"> {this.state.newFeature ? "שמור אפיון" : "שמור עדכונים"} </button>
                </form>
            </div>
        );
    }
}

export default CCStudentFeatures;



// import React, { Component } from 'react';
// import '../../../css/Style.css';
// import './styleStudentFeatures.css';
// import Footer from '../../LittleComponents/Footer';
// import NavBar from '../../LittleComponents/NavBar';
// import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
// import localHost from '../../LittleComponents/LocalHost';
// import Swal from 'sweetalert2';
// import $ from 'jquery';
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { TiArrowBack } from 'react-icons/ti';


// class CCStudentFeatures extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             QueAndAnsArr: [],
//             newFeature: false,
//             didChange: false,
//         }
//         let local = false;
//         this.apiUrlFeaturesQuestion = 'http://localhost:' + { localHost }.localHost + '/api/FeaturesQuestion';
//         this.apiUrlStudentFeatures = 'http://localhost:' + { localHost }.localHost + '/api/StudentFeatures';
//         if (!local) {
//             this.apiUrlFeaturesQuestion = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/FeaturesQuestion';
//             this.apiUrlStudentFeatures = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentFeatures';
//         }
//     }

//     componentDidMount() {
//         // גט לשאלות והתשובות
//         fetch(this.apiUrlStudentFeatures + '?studentID2=' + this.props.location.state.student.studentID
//             , {
//                 method: 'GET',
//                 headers: new Headers({
//                     'Content-Type': 'application/json; charset=UTF-8',
//                 })
//             })
//             .then(res => {
//                 console.log('res=', res);
//                 console.log('res.status', res.status);
//                 console.log('res.ok', res.ok);
//                 if (!res.ok)
//                     throw new Error('Network response was not ok.');
//                 return res.json();
//             })
//             .then(
//                 (result) => {
//                     console.log("QueAndAnsArr= ");
//                     console.log(result)
//                     console.log("QueAndAnsArr length= ", result.length);
//                     this.setState({ QueAndAnsArr: result, newFeature: (result[0].answer == null ? true : false) })
//                     console.log("אפיון חדש" + this.state.newFeature);
//                 },
//                 (error) => {
//                     console.log("err get=", error);
//תוקן
//                     Swal.fire({
//                         title: 'משהו השתבש',
//                         text: 'הפעולה נכשלה, נסה שנית',
//                         icon: 'warning',
//                         confirmButtonColor: '#e0819a',
//                     })
//                 });
//     }

//     PostPutFeature = (event) => {
//         event.preventDefault();

//         var allFilled = true;
//         this.state.QueAndAnsArr.map((item) => {
//             if (!(item.answer >= 1 && item.answer <= 5)) {
//תוקן
//                 Swal.fire({
//                     title: 'משהו השתבש!',
//                     text: 'צריך שכל השדות יהיו ממולאים',
//                     icon: 'warning',
//                     confirmButtonColor: '#e0819a',
//                 });
//                 allFilled = false
//             }
//         });
//         if (allFilled == false)
//             return;
//         const answers = this.state.QueAndAnsArr.map((item) => {
//             return {
//                 questionID: item.questionID,
//                 studentID: this.props.location.state.student.studentID,
//                 answer: item.answer
//             }
//         });

//         console.log(answers);
//         console.log(this.state.newFeature);

//         fetch(this.apiUrlStudentFeatures, {
//             method: this.state.newFeature ? 'POST' : 'PUT',
//             body: JSON.stringify(answers),
//             headers: new Headers({
//                 'Content-type': 'application/json; charset=UTF-8'
//             })
//         })
//             .then(res => {
//                 console.log('res=', res);
//                 if (!res.ok)
//                     throw new Error('Network response was not ok.');
//                 return res.json();
//             })
//             .then(
//                 (result) => {
//                     console.log("fetch POST/PUT= ", result);
//תוקן
//                     Swal.fire({
//                         title: 'מעולה!',
//                         text: this.state.newFeature ? 'אפיינת את התלמיד בהצלחה!' : 'עדכון האפיון בוצע בהצלחה',
//                         icon: 'success',
//                         confirmButtonColor: '#e0819a',
//                     });
//                     this.props.history.push({
//                         pathname: '/StudentPage',
//                         state: { student: this.props.location.state.student }
//                     });
//                 },
//                 (error) => {
//                     console.log("err post/put=", error);
//תוקן
//                     Swal.fire({
//                         title: 'משהו השתבש',
//                         text: 'הפעולה נכשלה, נסה שנית',
//                         icon: 'warning',
//                         confirmButtonColor: '#e0819a',
//                     })
//                 });
//     }

//     chooseAns = (e) => {
//         var NewAns = e.target.value.split(",");
//         this.setState({ didChange: true });
//         this.state.QueAndAnsArr.map((item) => item.answer = (item.questionID == NewAns[3] ? parseInt(NewAns[1]) : item.answer))
//         console.log(this.state.QueAndAnsArr);
//     }

//     goBack = () => {
//         if (this.state.didChange == false) {  //אם נכנס למסך אפיון תלמיד לחץ על החץ חזור אחורה אבל לא עשה שינויים
//             window.history.back();
//         }
//         else {  // אם כן עשה שינויים
//תוקן
//             Swal.fire({
//                 title: 'שים לב',
//                 text: "בלחיצה על כפתור זה תחזור אחורה וכל השינויים שעשית לא יישמרו",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#e0819a',
//                 cancelButtonColor: '#867D95',
//                 cancelButtonText: 'בטל',
//                 confirmButtonText: 'כן, חזור'
//             }).then((result) => {
//                 if (result.value) {  //אם בחר אישור
//                     window.history.back();
//                 }
//             });
//         }
//     }

//     render() {
//         const { QueAndAnsArr } = this.state;
//         return (
//             <div className="container-fluid">
//                 <NavBar />
//                 <div className="col-12"> {/* חזור למסך הקודם */}
//                     <TiArrowBack className="iconArrowBack" onClick={this.goBack} size={40} />
//                 </div>
//                 <form onSubmit={this.PostPutFeature}>
//                     <div className="turkiz">האפיון של {this.props.location.state.student.firstName} {this.props.location.state.student.lastName}</div>
//                     <div className="scalaDetails" dir="rtl">1- הכי חלש, 5- הכי חזק</div>
//                     <br />
//                     {
//                         QueAndAnsArr.map((item, key) =>
//                             <div key={item.questionID} className={`classCategory${item.categoryID}`}>
//                                 <div className="textHeadlineNum" id={`que${item.questionID}`} >שאלה מספר {key + 1} - שאלה בתחום ה{item.categoryName}</div>
//                                 <div><strong>{item.question}</strong></div>
//                                 <div>
//                                     <RadioGroup row aria-label="position" className="justify-content-between" name="position" id={`ans${item.questionID}`} onChange={this.chooseAns} defaultValue="">
//                                         <FormControlLabel
//                                             value={`radio,1,ans,${item.questionID}`}
//                                             control={<Radio color="secondary" />}
//                                             label="1"
//                                             checked={(item.answer == 1 ? true : null)}
//                                             labelPlacement="top"
//                                             id={`radio,1,ans,${item.questionID}`}

//                                         />
//                                         <FormControlLabel
//                                             value={`radio,2,ans,${item.questionID}`}
//                                             control={<Radio color="secondary" />}
//                                             label="2"
//                                             checked={(item.answer == 2 ? true : null)}
//                                             labelPlacement="top"
//                                             id={`radio,2,ans,${item.questionID}`}

//                                         />
//                                         <FormControlLabel
//                                             value={`radio,3,ans,${item.questionID}`}
//                                             control={<Radio color="secondary" />}
//                                             label="3"
//                                             checked={(item.answer == 3 ? true : null)}
//                                             labelPlacement="top"
//                                             id={`radio,3,ans,${item.questionID}`}

//                                         />
//                                         <FormControlLabel
//                                             value={`radio,4,ans,${item.questionID}`}
//                                             control={<Radio color="secondary" />}
//                                             label="4"
//                                             checked={(item.answer == 4 ? true : null)}
//                                             labelPlacement="top"
//                                             id={`radio,4,ans,${item.questionID}`}

//                                         />
//                                         <FormControlLabel
//                                             value={`radio,5,ans,${item.questionID}`}
//                                             control={<Radio color="secondary" />}
//                                             label="5"
//                                             checked={(item.answer == 5 ? true : null)}
//                                             labelPlacement="top"
//                                             id={`radio,5,ans,${item.questionID}`}

//                                         />
//                                     </RadioGroup>

//                                 </div>
//                             </div>
//                         )}

//                     <button type="submit" style={{ marginBottom: '8px' }} className="btn btn-info col-12 btnPink"> {this.state.newFeature ? "שמור אפיון" : "שמור עדכונים"} </button>

//                 </form>

//             </div>
//         );
//     }
// }

// export default CCStudentFeatures;