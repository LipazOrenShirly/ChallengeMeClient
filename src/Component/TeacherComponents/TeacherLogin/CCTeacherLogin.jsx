import React, { Component } from 'react';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import '../../../css/Style.css';
import './styleTeacherLogin.css';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import Swal from 'sweetalert2';
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';
import { TiArrowBack } from 'react-icons/ti';
import { Alert } from 'reactstrap';
import { askForPermissioToReceiveNotifications } from '../../../push-notification';


export default class CCTeacherLogin extends Component {
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
    let local = false;
    this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
    if (!local) {
      this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';
    }
  }

  static contextType = ProjectContext;

  async componentDidMount() {
    //לפני שעולה העמוד- אם קיימים שם משתמש וסיסמה בלוקל סטורז' אז תשמור אותם בסטייט כדי שיירשמו באינפוטים
    var un = await localStorage.getItem('username') != null ? localStorage.getItem('username') + '' : "";
    var ps = await localStorage.getItem('password') != null ? localStorage.getItem('password') + '' : "";
    await this.setState({ Username: un, Password: ps });
    // אם השם משתמש והסיסמא לא ריקים אז תעדכן בסטייט שלא צריכה להופיע הערה
    if (this.state.Username != "")
      this.setState({ HasUserNameValError: false });
    if (this.state.Password != "")
      this.setState({ HasPasswordError: false });
  }

  NewTeacher = () => {
    //כשלוחצים על יצירת מורה חדש העברה לעמוד המתאים
    this.props.history.push({
      pathname: '/newTeacher',
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
      localStorage.setItem('userType', 'teacher');
    }
  }

  SubmitNewPassword = (event) => {
    this.setState({ showChangePassword: false });
    const { Username, newPassword1 } = this.state;
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
        if (!res.ok)
            throw new Error('Network response was not ok.');
          return res.json();      
        })
      .then(
        (result) => {
          console.log("Submit= ", result);
          console.log("Submit= ", JSON.stringify(result));
          this.saveCredentials(Username, newPassword1); //תשמור פרטי חיבור בלוקאל סטורג' ובסשן סטורג'
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
            Swal.fire({
              title: 'אוי',
              text: 'הפעולה נכשלה, נסה שנית',
              icon: 'warning',
              confirmButtonColor: '#e0819a',
            })
        });
    event.preventDefault();
  }

  Submit = (event) => {
    console.log(this.state);
    const user = this.context;
    if (!this.state.HasUserNameValError && !this.state.HasPasswordError) //אם אין הערות
    {
      const { Username, Password } = this.state;
      //בעזרת גט בודק אם השם משתמש והסיסמה קיימים במערכת
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
          if (!res.ok)
            throw new Error('Network response was not ok.');
          return res.json();        
        })
        .then(
          (result) => {
            console.log("Submit= ", result);
            console.log("Submit= ", JSON.stringify(result));
            if (result.TeacherID != 0) { //אם המורה קיים בדאטה בייס
              this.saveCredentials(Username, Password); //תשמור פרטי חיבור בלוקאל סטורג' ובסשן סטורג'
              user.setTeacher(result.TeacherID); //אם קיים אז תשמור בקונטקט
              this.saveTeacherToken(); //יצירת תוקן למשתמש ושמירה שלו בטבלת תלמידים
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
            Swal.fire({
              title: 'אוי',
              text: 'הפעולה נכשלה, נסה שנית',
              icon: 'warning',
              confirmButtonColor: '#e0819a',
            })
          
          });
    }
    event.preventDefault();
  }

  saveTeacherToken = async () => {
    const user = await this.context;
    
    var token = await askForPermissioToReceiveNotifications(); //יצירת תוקן למשתמש
    var tokenString = await Promise.resolve(token).then((val) => val);
    var data = await {
      teacherID: user.teacherID,
      teacherToken: tokenString
    }  
    
    //פקודת פוסט ששומרת את התוקן של המשתמש בטבלת תלמידים
    await fetch(this.apiUrl + '/teacherToken', {
      method: 'PUT',
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
          Swal.fire({
            title: 'אוי',
            text: 'הפעולה נכשלה, נסה שנית',
            icon: 'warning',
            confirmButtonColor: '#e0819a',
          })
        });
  }

  // onRecieveNewPassword = () => {
  //   //take the password and change the db
  //   let p1 = $('#swal-input1').val();
  //   let p2 = $('#swal-input2').val();
  //   alert("new password is: " + p1);
  //   this.setState({ showChangePassword: false });
  // }

  render() {
    const {
      Username,
      Password,
      validate,
      newPassword1, newPassword2
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="col-12"> {/* חזור למסך הקודם */}
          <TiArrowBack className="iconArrowBack" onClick={() => this.props.history.push('/')} size={40} />
        </div>
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
                  msgOnError: "נא לכתוב סיסמה",
                  // customFunc: pas => { //Minimum eight characters, at least one letter, one number and                      :
                  //   const reg = /^(?=.*[A-Za-z])(?=.*\d)([@$!%*#?&]*)[A-Za-z\d@$!%*#?&]{8,}$/;
                  //   if (reg.test(pas)) {
                  //     return true;
                  //   } else {
                  //     this.setState({ HasPasswordError: true });
                  //     return "Minimum eight characters, at least one letter, one number and one special character";
                  //   }
                  // }
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

            <div className="rememberMeDiv">
              <label className="rememberTeacher">
                זכור אותי&nbsp;&nbsp;
                <input type="checkbox" name="remember" id="remember" />
              </label>
            </div><br />
            <div className="col-12">
              <button type="submit" id="submit" className="btn btn-info btnPink roundedBtn">כניסה</button>
              <div id="errorFromServer" className="react-inputs-validation__error___2aXSp"></div>
            </div>
            <h5 className="h5Teacher" onClick={this.ForgetPassword}> שכחתי סיסמה</h5>
          </form>
          <div onClick={this.NewTeacher}>
            <footer className="h6Teacher"><h6 > משתמש חדש? הרשם כאן</h6></footer>
          </div>
        </div>
      </div>
    );
  };
}