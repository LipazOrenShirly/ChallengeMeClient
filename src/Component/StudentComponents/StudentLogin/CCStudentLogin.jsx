import React, { Component } from 'react';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import '../../../css/Style.css';
import './stayleStudentLogin.css';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import Swal from 'sweetalert2'
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';


export default class CCStudentLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachersFromDB: [],
      validate: false,
      Username: "",
      Password: "",
      newPassword1: "",
      newPassword2: "",
      HasUserNameValError: true,
      HasPasswordError: true,
      HasnewPassword1Error: true,
      HasnewPassword2Error: true,
      showChangePassword: false,
    };
    let local = true;
    this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/...';
    if (!local) {
      this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod'+ '/api/...'; 
    }
  }

  componentDidMount = () => {
    //לפני שעולה העמוד- אם קיימים שם משתמש וססמה בלוקל סטורז' תביא אותם למקומות המתאימים
    let un = localStorage.getItem('username') != null ? localStorage.getItem('username') + '' : "";
    this.setState({ Username: un });
    let ps = localStorage.getItem('password') != null ? localStorage.getItem('password') + '' : "";
    this.setState({ Password: ps });
    if (this.state.Username != null)
      this.setState({ HasUserNameValError: false });
    if (this.state.Password != null)
      this.setState({ HasPasswordError: false });
    // $('#apasswordId').val(localStorage.getItem('password') != null ? localStorage.getItem('password') + '' : "");
  }

  NewStudentAlert = () => {
    Swal.fire({
        title: 'המתן',
        text: 'המחנך שלך צריך ליצור בשבילך משתמש',
        icon: 'warning',
        confirmButtonColor: 'rgb(135, 181, 189)',
      })
  }

  ForgetPassword = () => {
    //כשלוחצים על שכחתי סיסמה מועבר לעמוד מתאים
    this.props.history.push({
      pathname: '/TeacherForgetPassword',
    })
  }

  saveCredentials = (Username, Password) => {
    // שמירה של השם משתמש והסיסמה בסשן סטורג' כדי שתהיה בדיקה של פרטי החיבור בטעינה של כל עמוד בהמשך
    sessionStorage.setItem('password', Password);
    sessionStorage.setItem('username', Username);

    //אם מסומן זכור אותי שומר בלוקל סטורז
    if ($('#remember').prop('checked') === true) {
      localStorage.setItem('username', Username);
      localStorage.setItem('password', Password);
    }
  }

  static contextType = ProjectContext;

  SubmitNewPassword = (event) => {
    this.setState({ showChangePassword: false });
    const { Username, newPassword1 } = this.state;
    this.saveCredentials(Username, newPassword1);
    const user = this.context;
    fetch(this.apiUrl + '?teacherID=' + user.teacherID + '&password=' + this.state.newPassword1
      , {
        method: 'PUT',
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
          Swal.fire({
            title: 'מעולה!',
            text: 'הסיסמה שונתה בהצלחה',
            icon: 'success',
            confirmButtonColor: '#e0819a',
          })
            .then(
              this.props.history.push('/HomePageTeacher/'));
        },
        (error) => {
          console.log("err get=", error);
        });
    event.preventDefault();
  }

  Submit = (event) => {
    const user = this.context;
    if (!this.state.HasUserNameValError && !this.state.HasPasswordError) //אם אין הערות
    {
      const { Username, Password } = this.state;
      this.saveCredentials(Username, Password);

      //בעזרת גט בודק אם השם משתמש וססמה קיימים במערכת
      fetch(this.apiUrl + '?username=' + Username + '&password=' + Password
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
            if (result.TeacherID != 0) { //אם המורה קיים בדאטה בייס
              user.setTeacher(result.TeacherID); //אם קיים אז תשמור בקונטקט
              if (result.TempPassword == 0)//אם לא סיסמה זמנית תעבור לעמוד הבא
                this.props.history.push('/HomePageTeacher/');
              else {//אם זה סיסמה זמנית אז
                this.setState({ showChangePassword: true });
              }
            }
            else {
              $('#errorFromServer').empty();
              $('#errorFromServer').append("שם המשתמש או הסיסמה אינם נכונים");//הודעה למשתמש
            }
          },
          (error) => {
            console.log("err get=", error);
          });
    }
    event.preventDefault();
  }

  onRecieveNewPassword = () => {
    //take the password and change the db
    let p1 = $('#swal-input1').val();
    let p2 = $('#swal-input2').val();
    alert("new password is: " + p1);
    this.setState({ showChangePassword: false });
  }

  render() {
    const {
      Username,
      Password,
      validate,
      newPassword1, newPassword2
    } = this.state;

    return (
      <div className="container-fluid studentPage">
        <div className="loginDiv">
          <div className="col-12">
            <img className="logoImgLoginTeacher" src={require('../../../img/logoChallengeMe.svg')} />
          </div>
          <form onSubmit={this.state.showChangePassword ? this.SubmitNewPassword : this.Submit}>
            <div className="form-group col-12">
              <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                attributesInput={{
                  id: 'unameId',
                  type: 'text',
                  placeholder: 'הכנס שם משתמש',
                  className: "form-control inputRounded"
                }}

                value={Username}
                validationCallback={res =>
                  this.setState({ HasUserNameValError: res, validate: false })
                }
                onChange={(Username, e) => { //כל שינוי הוא שומר בסטייט
                  this.setState({ Username });
                  console.log(e);
                }}
                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                validationOption={{
                  check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                  required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                  msgOnError: "נא לכתוב שם משתמש",
                }}
              />
            </div>
            <div className="form-group col-12">
              <Textbox
                attributesInput={{
                  id: 'apasswordId',
                  type: 'password',
                  placeholder: 'הכנס סיסמה',
                  className: "form-control inputRounded"
                }}
                value={Password} // Optional.[String].Default: "".
                validationCallback={res =>
                  this.setState({ HasPasswordError: res, validate: false })
                }
                onChange={(Password, e) => {
                  this.setState({ Password });
                  console.log(e);
                }} // Required.[Func].Default: () => {}. Will return the value.
                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                validationOption={{
                  check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                  required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                  customFunc: pas => { //Minimum eight characters, at least one letter, one number and                      :
                    const reg = /^(?=.*[A-Za-z])(?=.*\d)([@$!%*#?&]*)[A-Za-z\d@$!%*#?&]{8,}$/;
                    if (reg.test(pas)) {
                      return true;
                    } else {
                      this.setState({ HasPasswordError: true });
                      return "Minimum eight characters, at least one letter, one number and one special character";
                    }
                  }
                }}
              />
            </div>

            {/* אם הסיסמה זמנית מראה את 2 השדות לכתיבת סיסמה חדשה */}
            {this.state.showChangePassword &&
              <div>
                <div className="form-group col-12">הסיסמה שלך זמנית, עליך לבחור סיסמה חדשה</div>
                <div className="form-group col-12">
                  <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                    attributesInput={{
                      id: 'newPassword1',
                      type: 'password',
                      placeholder: 'הזן ססמה חדשה',
                      className: "form-control inputRounded"
                    }}
                    value={newPassword1}
                    validationCallback={res =>
                      this.setState({ HasnewPassword1Error: res, validate: false })
                    }
                    onChange={(newPassword1, e) => { //כל שינוי הוא שומר בסטייט
                      this.setState({ newPassword1 });
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
                          this.setState({ HasnewPassword1Error: true });
                          return "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
                        }
                      }
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                    attributesInput={{
                      id: 'newPassword2',
                      type: 'password',
                      placeholder: 'הזן ססמה בשנית',
                      className: "form-control inputRounded"
                    }}
                    value={newPassword2}
                    validationCallback={res =>
                      this.setState({ HasnewPassword2Error: res, validate: false })
                    }
                    onChange={(newPassword2, e) => { //כל שינוי הוא שומר בסטייט
                      this.setState({ newPassword2 });
                      console.log(e);
                    }}
                    onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    validationOption={{
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                      customFunc: pas => { //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
                        const reg = /^(?=.*[A-Za-z])(?=.*\d)([@$!%*#?&]*)[A-Za-z\d@$!%*#?&]{8,}$/;
                        if (reg.test(pas)) {
                          if (newPassword2 == newPassword1)
                            return true;
                          else {
                            this.setState({ HasnewPassword2Error: true });
                            return "not like first password";
                          }
                        } else {
                          this.setState({ HasnewPassword2Error: true });
                          return "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
                        }
                      }
                    }}
                  />
                </div>
              </div>
            }

            <div className="rememberMeDivStudent">
              <label className="rememberStudent">
                זכור אותי&nbsp;&nbsp;
                <input type="checkbox" name="remember" id="remember" />
              </label>
            </div><br />
            <div className="col-12">
              <button type="submit" id="submit" className="btn btn-info btnYellow roundedBtn">כניסה</button>
              <div id="errorFromServer" className="react-inputs-validation__error___2aXSp"></div>
            </div>
            <h5 onClick={this.ForgetPassword}> שכחתי סיסמה</h5>
          </form>
          <div onClick={this.NewStudentAlert}>
            <h6> ?אין לך עדיין משתמש</h6>
          </div>
        </div>
      </div>
    );
  };
}