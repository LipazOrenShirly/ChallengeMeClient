import React, { Component } from 'react';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import '../../../css/Style.css';
import './styleNewTeacher.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { TiArrowBack } from 'react-icons/ti';
import FreeSoloGroupedInst from '../../LittleComponents/FreeSoloGroupedInst';

export default class CCnewTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            mail: "",
            phone: "",
            password: "",
            password2: "",
            school: "",
            HasfirstNameValError: true,
            HaslastNameValError: true,
            HasuserNameValError: true,
            HasmailValError: true,
            HasphoneValError: true,
            HaspasswordValError: true,
            Haspassword2ValError: true,
            HasschoolValError: true,
            isUserNameExist: false,
            institutionsArr: [],
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        this.apiUrlInstitution = 'http://localhost:' + { localHost }.localHost + '/api/Institution';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';
            this.apiUrlInstitution = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Institution';
        }
    }

    componentDidMount() {
        this.getInstitutions()
    }

    getInstitutions = () => {
        fetch(this.apiUrlInstitution
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
                    console.log(result);
                    this.setState({ institutionsArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'טעינת רשימת מוסדות הלימוד, אנא נסה להכנס לעמוד מחדש',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })
    }

    Submit = (event) => {
        console.log(this.state);

        if (!this.state.HasfirstNameValError &&
            !this.state.HaslastNameValError &&
            !this.state.HasuserNameValError &&
            !this.state.HasmailValError &&
            !this.state.HasphoneValError &&
            !this.state.HaspasswordValError &&
            !this.state.Haspassword2ValError &&
            !this.state.HasschoolValError
        ) {
            console.log('state=' + this.state);

            var data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                mail: this.state.mail,
                phone: this.state.phone,
                password: this.state.password,
                school: this.state.school
            }
            console.log('data=' + data);
            fetch(this.apiUrl, {
                method: 'POST',
                body: JSON.stringify(data),
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
                        console.log("fetch POST= ", result);

                    },
                    (error) => {
                        console.log("err post=", error);
                        //תוקן
                        Swal.fire({
                            title: 'משהו השתבש',
                            text: 'יצירת המורה לא בוצעה, אנא נסה שנית',
                            icon: 'warning',
                            confirmButtonColor: '#e0819a',
                        })
                    })
                .then(
                    //תוקן
                    Swal.fire({
                        title: 'מעולה!',
                        text: 'הוספת בהצלחה!',
                        icon: 'success',
                        confirmButtonColor: '#e0819a',
                    }).then(
                        this.props.history.push({
                            pathname: '/TeacherLogin',
                        }))
                );
        }
        event.preventDefault();
    }

    checkIfUserNameExist(e) {
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("Submit= ", result);
                    console.log("Submit= ", JSON.stringify(result));
                    if (result == 1) { // כבר קיים השם משתמש הזה
                        this.setState({ HasuserNameValError: true });
                        $('#userNameValuesError').empty();
                        $('#userNameValuesError').append("this userName is already taken");
                    }
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

    checkIfPhoneExist = (e) => {
        var phone = parseInt(e.target.value);
        // this.setState({ phone: "" })
        $('#PhoneValuesError').empty();

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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("Submit= ", result);
                    console.log("Submit= ", JSON.stringify(result));
                    if (result != 0) { // כבר קיים מספר הטלפון הזה
                        this.setState({ HasphoneValError: true });
                        $('#PhoneValuesError').empty();
                        $('#PhoneValuesError').append("מספר הטלפון הזה כבר קיים במערכת");
                    }
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

    onChangeInst = (event, value) => {
        this.setState({
            school: value != null ? value.institutionID : null,
            HasschoolValError: value != null ? false : true,
        });
        if (value == null) {
            $('#schoolValuesError').empty();
            $('#schoolValuesError').append("יש לבחור מוסד לימוד מהרשימה");
        }
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
                    <div className="col-12"> {/* חזור למסך הקודם */}
                        <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                    </div>
                    <Logo></Logo>

                    <form onSubmit={this.Submit}>
                        <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    autoComplete: "off",
                                    id: 'NewTFirstName',
                                    type: 'text',
                                    placeholder: 'שם פרטי',
                                    className: "form-control inputNewTeacher"
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
                                    autoComplete: "off",
                                    id: 'NewTLastName',
                                    type: 'text',
                                    placeholder: 'שם משפחה',
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
                                    autoComplete: "off",
                                    id: 'NewTUserName',
                                    type: 'text',
                                    placeholder: 'שם משתמש',
                                    className: "form-control inputNewTeacher"
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
                                    autoComplete: "off",
                                    id: 'NewTMail',
                                    type: 'mail',
                                    placeholder: 'כתובת מייל',
                                    className: "form-control inputNewTeacher"
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
                                    autoComplete: "off",
                                    id: 'NewTPhone',
                                    type: 'text',
                                    placeholder: 'פלאפון',
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
                                    console.log(phone);
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
                                            return "מספר הטלפון לא תקין";
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className='errorInputuserName' id="PhoneValuesError"></div>

                        <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    // autoComplete: "off",
                                    autoComplete: "new-password",
                                    id: 'NewTPassword',
                                    type: 'password',
                                    placeholder: 'הזן ססמה',
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
                                    autoComplete: "off",
                                    id: 'password2',
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

                        {/* <div className="form-group col-12">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    autoComplete: "off",
                                    id: 'NewTSchool',
                                    type: 'text',
                                    placeholder: 'מוסד לימודים שהינך מלמד בו',
                                    className: "form-control inputNewTeacher"
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
                        </div> */}
                        <div className="form-group col-12" dir="rtl">
                            <FreeSoloGroupedInst
                                options={this.state.institutionsArr.sort(function (a, b) {
                                    if (a.institutionName < b.institutionName) return -1;
                                    if (b.institutionName > a.institutionName) return 1;
                                    return 0;
                                })}
                                onChange={this.onChangeInst}
                                label='מוסד לימודים שהינך מלמד בו'
                                id='institutions' />
                        </div>
                        <div className='errorInputuserName' id="schoolValuesError"></div>


                        <div className="col-12">
                            <button type="submit" id="submit" className="btn btn-info btnPink">כניסה</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}