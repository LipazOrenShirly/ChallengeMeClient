import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherInfoScreen.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo';
import $ from 'jquery';
import NavBar from '../../LittleComponents/NavBar';
import localHost from '../../LittleComponents/LocalHost';
import ProjectContext from '../../../Context/ProjectContext';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import Swal from 'sweetalert2';


export default class CCTeacherInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: {},
            firstName: "",
            lastName: "",
            mail: "",
            phone: "",
            password: "",
            password2: "",
            school: "",
            HasfirstNameValError: true,
            HaslastNameValError: true,
            HasmailValError: true,
            HasphoneValError: true,
            HaspasswordValError: true,
            Haspassword2ValError: true,
            HasschoolValError: true,
            showPassword2: false
        }
       
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        if (!local) {
          this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod'+ '/api/Teacher'; 
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
        this.setState({ user: this.context })
        console.log('teacherID = ' + JSON.stringify(user.teacherID));
        this.getInPlace(user);
    }
    getInPlace = (user) => {
        fetch(this.apiUrl + '?teacherID=' + user.teacherID
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
                    console.log("teacher= ", result);
                    this.setState({ teacher: result[0] });
                    console.log(this.state.teacher);
                },
                (error) => {
                    console.log("err get=", error);
                })
            .then(() => {

                this.setState({
                    firstName: this.state.teacher.firstName,
                    lastName: this.state.teacher.lastName,
                    userName: this.state.teacher.userName,
                    mail: this.state.teacher.mail,
                    phone: this.state.teacher.phone,
                    password: this.state.teacher.password,
                    password2: this.state.teacher.password,
                    school: this.state.teacher.school
                })
            });
    }

    UpdateDetails = (event) => {
        var updatedDetails = {
            firstName: $('#UpdateTFirstName').val(),
            lastName: $('#UpdateTLastName').val(),
            userName: $('#UpdateTUserName').val(),
            mail: $('#UpdateTMail').val(),
            phone: $('#UpdateTPhone').val(),
            password: $('#UpdateTPassword').val(),
            school: $('#UpdateTSchool').val(),
            teacherID: 8
        }
        fetch(this.apiUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedDetails),
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
                        text: 'הפרטים שונו בהצלחה!',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    })
                },
                (error) => {
                    console.log("err PUT=", error);
                });
        event.preventDefault();
        // window.location.reload();
    }

    btnClick = () => {
        const user = this.context;
        Swal.fire({
            title: 'אתה בטוח!',
            text: 'אתה בטוח שאתה רוצה לבטל את השינויים?',
            icon: 'warning',
            confirmButtonColor: '#e0819a',
        }).then(
            this.getInPlace(user)
        )
    }
    checkIfUserNameExist = (e)=>{
            var usernameNewTeacher = e.target.value;
            $('#userNameValuesError').empty();
    
            // לעשות פונקציה בשרת שבודקת ומחזירה 0 או 1
            fetch(this.apiUrl + '?usernameNewTeacher=' + usernameNewTeacher
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
                        if (result == 1) { // כבר קיים השם משתמש הזה
                           if(usernameNewTeacher==this.state.teacher.userName)
                                return;
                            this.setState({ HasuserNameValError: true });
                            $('#userNameValuesError').empty();
                            $('#userNameValuesError').append("this userName is already taken");
                        }
                    },
                    (error) => {
                        console.log("err get=", error);
                    });
    }

    render() {
        const {
            firstName,
            lastName,
            userName,
            mail,
            phone,
            password,
            password2,
            school,
        } = this.state;
        return (
            <div className="container-fluid">
                <div className="loginDiv">
                    <NavBar></NavBar><br />
                    <form onSubmit={this.UpdateDetails} dir="rtl">
                        <div className="myInformation">הפרטים שלי</div>

                        <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    id: 'UpdateTFirstName',
                                    type: 'text',
                                    placeholder: 'שם פרטי',
                                    className: "form-control inputUpdateTeacher"
                                }}
                                value={firstName}
                                validationCallback={(res) => { this.setState({ HasfirstNameValError: res }) }
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
                                            // this.setState({ HasfirstNameValError: true });
                                            return "Name is required.";
                                        }
                                        if (v.length < 2) {
                                            // this.setState({ HasfirstNameValError: true });
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
                                    id: 'UpdateTLastName',
                                    type: 'text',
                                    placeholder: 'שם משפחה',
                                    className: "form-control inputUpdateTeacher",
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
                                    id: 'UpdateTUserName',
                                    type: 'text',
                                    placeholder: 'שם משתמש',
                                    className: "form-control inputUpdateTeacher"
                                }}
                                
                                value={userName}
                                validationCallback={res =>
                                    this.setState({ HasuserNameValError: res, validate: false })
                                }
                                onChange={(userName, e) => { //כל שינוי הוא שומר בסטייט
                                    this.setState({ userName });
                                    console.log(e);
                                }}
                                onBlur={(e) => {
                                    console.log(e)
                                    this.checkIfUserNameExist(e)
                                }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                                validationOption={{
                                    check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                    required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                                    customFunc: async v => {
                                        if (v === "") {
                                            this.setState({ HasuserNameValError: true });
                                            return "Name is required.";
                                        }
                                        
                                        return true;
                                    }
                                }}
                            />
                        </div>
                        <div className='errorInputuserName' id="userNameValuesError"></div>

                        <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    id: 'UpdateTMail',
                                    type: 'mail',
                                    placeholder: 'כתובת מייל',
                                    className: "form-control inputUpdateTeacher"
                                }}

                                value={mail}
                                validationCallback={res =>
                                    this.setState({ HasmailValError: res, validate: false })
                                }
                                onChange={(mail, e) => { //כל שינוי הוא שומר בסטייט
                                    this.setState({ mail });
                                    console.log(e);
                                }}
                                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                                validationOption={{
                                    check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                    required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                                    customFunc: mail => {
                                        const reg1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        if (reg1.test(String(mail).toLowerCase())) {
                                            return true;
                                        } else {
                                            this.setState({ HasmailValError: true });
                                            return "is not a valid email address";
                                        }
                                    }
                                }}
                            />

                        </div>

                        <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    id: 'UpdateTPhone',
                                    type: 'text',
                                    placeholder: 'פלאפון',
                                    className: "form-control inputUpdateTeacher"
                                }}

                                value={phone}
                                validationCallback={res =>
                                    this.setState({ HasphoneValError: res, validate: false })
                                }
                                onChange={(phone, e) => { //כל שינוי הוא שומר בסטייט
                                    this.setState({ phone });
                                    console.log(e);
                                }}
                                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
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

                        <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    id: 'UpdateTPassword',
                                    type: 'password',
                                    placeholder: 'הזן ססמה',
                                    className: "form-control inputUpdateTeacher"
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
                                    customFunc: pas => { //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
                                        const reg = /^(?=.*[A-Za-z])(?=.*\d)([@$!%*#?&]*)[A-Za-z\d@$!%*#?&]{8,}$/;
                                        if (reg.test(pas)) {
                                            return true;
                                        } else {
                                            this.setState({ HaspasswordValError: true });
                                            return "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
                                        }
                                    }
                                }}
                            />
                        </div>


                        <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    id: 'UpdateTPassword2',
                                    type: 'password',
                                    placeholder: 'הזן ססמה בשנית',
                                    className: "form-control inputUpdateTeacher"
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
                                    customFunc: pas => { //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
                                        const reg = /^(?=.*[A-Za-z])(?=.*\d)([@$!%*#?&]*)[A-Za-z\d@$!%*#?&]{8,}$/;
                                        if (reg.test(pas)) {
                                            if (password2 == password)
                                                return true;
                                            else {
                                                this.setState({ Haspassword2ValError: true });
                                                return "not like first password";
                                            }
                                        } else {
                                            this.setState({ Haspassword2ValError: true });
                                            return "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
                                        }
                                    }
                                }}
                            />
                        </div>

                        <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    id: 'UpdateTSchool',
                                    type: 'text',
                                    placeholder: 'מוסד לימודים שהינך מלמד בו',
                                    className: "form-control inputUpdateTeacher"
                                }}

                                value={school}
                                validationCallback={res =>
                                    this.setState({ HasschoolValError: res, validate: false })
                                }
                                onChange={(school, e) => { //כל שינוי הוא שומר בסטייט
                                    this.setState({ school });
                                    console.log(e);
                                }}
                                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                                validationOption={{
                                    check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                    required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                                    customFunc: async v => {
                                        if (v === "") {
                                            this.setState({ HasschoolValError: true });
                                            return "School Name is required.";
                                        }
                                        if (v.length < 2) {
                                            this.setState({ HasschoolValError: true });
                                            return "School Name needs at least 2 length.";
                                        }
                                        return true;
                                    }
                                }}
                            />
                        </div>

                        <div className="col-12" >
                            <button type="submit" id="save" className="btn btn-info col-8 btnYellow"  >עדכן פרטים</button>
                            <button type="button" id="cancel" className="btn btn-info col-4 btnYellow cencelBtn" onClick={this.btnClick} >בטל</button>
                        </div>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        );
    };
}