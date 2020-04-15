import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAddNewStudent.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import ProjectContext from '../../../Context/ProjectContext';


import $ from 'jquery';

export default class CCAddNewChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SfirstName: "",
            HasSfirstNameValError: true,
            SlastName: "",
            HasSlastNameValError: true,
            Sphone: "",
            HasSphoneValError: true,
            Spassword: "",
            HasSpasswordValError: true,
            Spassword2: "",
            HasSpassword2ValError: true,
            SBirthDate: "",
            isPhoneExist:false,
            student: {}
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    static contextType = ProjectContext;

    createNewStudent = async () => {
        const user = this.context;

        if (!this.state.HasSfirstNameValError &&
            !this.state.HasSlastNameValError &&
            !this.state.HasSphoneValError &&
            !this.state.HasSpasswordValError &&
            !this.state.HasSpassword2ValError
        ) {
            var student1 = {
                firstName: this.state.SfirstName,
                lastName: this.state.SlastName,
                phone: this.state.Sphone,
                password: this.state.Spassword2,
                birthDate: this.state.SBirthDate,
                classID: this.props.location.state.classID,
                teacherID: user.teacherID
            }
            console.log('student1 = ' + student1);
            var result = await fetch(this.apiUrl, {
                method: 'POST',
                body: JSON.stringify(student1),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8'
                })
            })
            var jsonRes = await result.json();
            this.setState({ student: jsonRes });
            Swal.fire({
                title: 'מעולה!',
                text: 'הוספת את התלמיד בהצלחה!',
                icon: 'success',
                confirmButtonColor: '#e0819a',
            })
            return jsonRes;


        }
    }
    checkIfPhoneExist(e){
        $('#phoneValuesError').empty();

        var phone= parseInt(e.target.value);
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
            if ( result != 0){ // כבר קיים השם משתמש הזה
                this.setState({ HasSphoneValError: true})
                $('#phoneValuesError').empty();
                $('#phoneValuesError').append("מספר הטלפון כבר שמור במערכת, אנא בחר מספר אחר");
                }
         
          },
          (error) => {
            console.log("err get=", error);
          });
    
    }
    CreateAndGoToStudentFeatures = async () => {
        var res = await this.createNewStudent();      
        this.props.history.push({
            pathname: '/StudentFeatures',
            state: { student: res[0] }
        })
      

    }

    CreateAndGoToHomePage = () => {
        this.createNewStudent();
        this.props.history.push({
            pathname: '/HomePageTeacher',
        })
    }

    render() {
        const { SfirstName, SlastName, Sphone, Spassword, Spassword2, Sage, SBirthDate } = this.state;
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="col-12 turkiz">הוספת תלמיד חדש</div>
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
                        value={SfirstName}
                        validationCallback={(res) => { this.setState({ HasSfirstNameValError: res }) }
                        }
                        onChange={(SfirstName, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ SfirstName });
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
                            id: 'NewStudentLastName',
                            type: 'text',
                            placeholder: 'שם המשפחה של התלמיד',
                            className: "form-control inputNewTeacher",
                        }}

                        value={SlastName}
                        validationCallback={res =>
                            this.setState({ HasSlastNameValError: res, validate: false })
                        }
                        onChange={(SlastName, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ SlastName });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: async v => {
                                if (v === "") {
                                    this.setState({ HasSlastNameValError: true });
                                    return "Last Name is required.";
                                }
                                if (v.length < 2) {
                                    this.setState({ HasSlastNameValError: true });
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

                        value={Sphone}
                        validationCallback={res =>
                            this.setState({ HasSphoneValError: res, validate: false })
                        }
                        onChange={(Sphone, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ Sphone });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) 
                            this.checkIfPhoneExist(e)}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: phoneNum => {
                                const reg = /^0\d([\d]{0,1})([-]{0,1})\d{8}$/;

                              
                                if (reg.test(phoneNum)) {
                                    return true;
                                
                                }else {
                                    this.setState({ HasSphoneValError: true });
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

                        value={Spassword}
                        validationCallback={res =>
                            this.setState({ HasSpasswordValError: res, validate: false })
                        }
                        onChange={(Spassword, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ Spassword });
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
                                    this.setState({ HasSpasswordValError: true });
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

                        value={Spassword2}
                        validationCallback={res =>
                            this.setState({ HasSpassword2ValError: res, validate: false })
                        }
                        onChange={(Spassword2, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ Spassword2 });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: pas => { //Minimum 5 characters, at least one letter and one number:
                                const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
                                if (reg.test(pas)) {
                                    if (Spassword2 == Spassword)
                                        return true;
                                    else {
                                        this.setState({ HasSpassword2ValError: true });
                                        return "not like first password";
                                    }
                                } else {
                                    this.setState({ HasSpassword2ValError: true });
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

                        value={SBirthDate}

                        onChange={(SBirthDate, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ SBirthDate });
                            console.log(e);
                        }}
                        onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.

                    />
                </div>
                <div className="form-group col-12">
                    <button className="btn btn-info createNewChallenge btnAddNewStudent" onClick={this.CreateAndGoToStudentFeatures}>יצירת התלמיד והעברה לאפיון תלמיד</button>
                </div>
                <div className="form-group col-12">
                    <button className="btn btn-info createNewChallenge btnAddNewStudent" onClick={this.CreateAndGoToHomePage}>יצירת תלמיד והמשכת האפיון במועד מאוחר יותר</button>
                </div>


                <Footer></Footer>
            </div>
        );
    };
}



