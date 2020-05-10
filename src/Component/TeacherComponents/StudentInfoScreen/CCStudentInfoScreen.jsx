import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudentInfoScreen.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import ProjectContext from '../../../Context/ProjectContext';
import { TiArrowBack } from 'react-icons/ti';


import $ from 'jquery';

export default class CCStudentInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            studentID: "",
            firstName: "",
            HafirstNameValError: false,
            lastName: "",
            HaslastNameValError: false,
            phone: "",
            HasphoneValError: false,
            password: "",
            HaspasswordValError: false,
            password2: "",
            Haspassword2ValError: false,
            birthDate: "",
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const student = this.props.location.state.student;

        fetch(this.apiUrl + '?studentID=' + student.studentID
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
                    console.log("teacher= ", result[0]);
                    this.setState({
                        studentID: result[0].studentID,
                        firstName: result[0].firstName,
                        lastName: result[0].lastName,
                        phone: result[0].phone,
                        password: result[0].password,
                        password2: result[0].password,
                        birthDate: result[0].birthDate
                    })
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    UpdateStudentInfo = (event) => {
        const user = this.context;

        if (!this.state.HafirstNameValError &&
            !this.state.HaslastNameValError &&
            !this.state.HasphoneValError &&
            !this.state.HaspasswordValError &&
            !this.state.Haspassword2ValError
        ) {
            var student = {
                studentID: this.props.location.state.student.studentID,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
                password: this.state.password2,
                birthDate: this.state.birthDate,
                classID: this.props.location.state.student.classID,
                teacherID: this.props.location.state.student.teacherID
            }
            console.log('student = ' + student);
            fetch(this.apiUrl, {
                method: 'PUT',
                body: JSON.stringify(student),
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
                            title: 'השתנה!',
                            text: 'פרטי התלמיד השתנו בהצלחה!',
                            icon: 'success',
                            confirmButtonColor: '#e0819a',
                        });
                        this.props.history.push({
                            pathname: '/StudentPage',
                            state: { student: student }
                        });
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
            event.preventDefault();
        }
    }

    checkIfPhoneExist(e) {
        $('#phoneValuesError').empty();

        var phone = parseInt(e.target.value);
        console.log(phone);
        // לעשות פונקציה בשרת שבודקת ומחזירה 0 או 1
        fetch(this.apiUrl + '?phone=0' + phone
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
                    console.log("Submit= ", result);
                    console.log("Submit= ", JSON.stringify(result));
                    if (result != 0) { // כבר קיים השם משתמש הזה
                        this.setState({ HasSphoneValError: true })
                        $('#phoneValuesError').empty();
                        $('#phoneValuesError').append("מספר הטלפון כבר שמור במערכת, אנא בחר מספר אחר");
                    }

                },
                (error) => {
                    console.log("err get=", error);
                });

    }

    render() {
        const { firstName, lastName, phone, password, password2, Sage, birthDate } = this.state;
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">עדכון פרטי התלמיד</div>
                {/* <div className="col-12">לפני הוספת התלמיד נצטרך שתמלא כמה פרטים שיעזרו לנו בהמשך לאפיין את הילד כמו שצריך ויוכל להקל עלייך רבות בבחירת האתגרים</div> */}
                <br />

                <div className="form-group col-12">
                    <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'NewStudentFirstName',
                            type: 'text',
                            placeholder: 'שם פרטי של התלמיד',
                            className: "form-control inputNewTeacher"
                        }}
                        value={firstName}
                        validationCallback={(res) => { this.setState({ HafirstNameValError: res }) }
                        }
                        onChange={(firstName, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ firstName });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: async v => {
                                if (v === "") {
                                    // this.setState({ HafirstNameValError: true });
                                    return "Name is required.";
                                }
                                if (v.length < 2) {
                                    // this.setState({ HafirstNameValError: true });
                                    return "Name needs at least 2 length.";
                                }
                                return true;
                            }
                        }}
                    />
                </div>

                <div className="form-group col-12">
                    <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'NewStudentLastName',
                            type: 'text',
                            placeholder: 'שם המשפחה של התלמיד',
                            className: "form-control inputNewTeacher",
                        }}

                        value={lastName}
                        validationCallback={res =>
                            this.setState({ HaslastNameValError: res, validate: false })
                        }
                        onChange={(lastName, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ lastName });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: async v => {
                                if (v === "") {
                                    this.setState({ HaslastNameValError: true });
                                    return "Last Name is required.";
                                }
                                if (v.length < 2) {
                                    this.setState({ HaslastNameValError: true });
                                    return "Last Name needs at least 2 length.";
                                }
                                return true;
                            }
                        }}
                    />
                </div>

                <div className="form-group col-12">
                    <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'NewStudentPhone',
                            type: 'text',
                            placeholder: 'מספר הפלאפון של התלמיד',
                            className: "form-control inputNewTeacher"
                        }}

                        value={phone}
                        validationCallback={res =>
                            this.setState({ HasphoneValError: res, validate: false })
                        }
                        onChange={(phone, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ phone });
                            console.log(e);
                        }}
                        onBlur={(e) => {
                            console.log(e);
                            this.checkIfPhoneExist(e);
                        }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: phoneNum => {
                                const reg = /^0\d([\d]{0,1})([-]{0,1})\d{8}$/;
                                if (reg.test(phoneNum)) {
                                    return true;
                                } else {
                                    this.setState({ HasphoneValError: true });
                                    return "is not a valid phone number";
                                }
                            }
                        }}
                    />
                </div>
                <div className='errorInputPhone' id="phoneValuesError"></div>

                <div className="form-group col-12">
                    <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'NewStudentPassword',
                            type: 'password',
                            placeholder: 'הזן ססמה שהתלמיד יוכל לזכור',
                            className: "form-control inputNewTeacher"
                        }}

                        value={password}
                        validationCallback={res =>
                            this.setState({ HaspasswordValError: res, validate: false })
                        }
                        onChange={(password, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ password });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: pas => { //Minimum 5 characters, at least one letter and one number:
                                const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
                                if (reg.test(pas)) {
                                    return true;
                                } else {
                                    this.setState({ HaspasswordValError: true });
                                    return "Minimum 5 characters, at least one letter and one number";
                                }
                            }
                        }}
                    />
                </div>

                <div className="form-group col-12">
                    <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'NewStudentPassword2',
                            type: 'password',
                            placeholder: 'הזן ססמה בשנית',
                            className: "form-control inputNewTeacher"
                        }}

                        value={password2}
                        validationCallback={res =>
                            this.setState({ Haspassword2ValError: res, validate: false })
                        }
                        onChange={(password2, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ password2 });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: pas => { //Minimum 5 characters, at least one letter and one number:
                                const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
                                if (reg.test(pas)) {
                                    if (password2 == password)
                                        return true;
                                    else {
                                        this.setState({ Haspassword2ValError: true });
                                        return "not like first password";
                                    }
                                } else {
                                    this.setState({ Haspassword2ValError: true });
                                    return "Minimum 5 characters, at least one letter and one number";
                                }
                            }
                        }}
                    />
                </div>

                <div className="form-group col-12">
                    {/* ללא ולידציות, אולי לא יודע תאריך לידה */}
                    <Textbox
                        attributesInput={{
                            id: 'NewStudentBirthDate',
                            type: 'date',
                            placeholder: 'תאריך לידה תלמיד',
                            className: "form-control inputNewTeacher"
                        }}

                        value={birthDate}

                        onChange={(birthDate, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ birthDate });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.

                    />
                </div>
                <div className="form-group col-12">
                    <button className="btn btn-info createNewChallenge btnAddNewStudent" onClick={this.UpdateStudentInfo}>שמירת עדכונים</button>
                </div>
                {/* <div className="form-group col-12">
                    <button className="btn btn-info createNewChallenge btnAddNewStudent" onClick={this.CreateAndGoToHomePage}>יצירת תלמיד והמשכת האפיון במועד מאוחר יותר</button>
                </div> */}


                <Footer></Footer>
            </div>
        );
    };
}