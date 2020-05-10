import React, { Component } from 'react';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import './stayleStudentLogin.css';
import '../../../css/Style.css';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import Swal from 'sweetalert2';
import { TiArrowBack } from 'react-icons/ti';


export default class CCStudentLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachersFromDB: [],
      validate: false,
      Phone: "",
      Password: "",
      HasPhoneValError: true,
      HasPasswordError: true,
    };
    let local = false;
    this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
    if (!local) {
      this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod'+ '/api/Student'; 
    }
  }

  static contextType = ProjectContext;

  async componentDidMount () {
    //לפני שעולה העמוד- אם קיימים שם משתמש וססמה בלוקל סטורז' תביא אותם למקומות המתאימים
    let un = await localStorage.getItem('SPhone') != null ? localStorage.getItem('SPhone') + '' : "";
    let ps = await localStorage.getItem('Spassword') != null ? localStorage.getItem('Spassword') + '' : "";
    await this.setState({ Phone: un, Password: ps });
    if (this.state.Phone != "")
      this.setState({ HasPhoneValError: false });
    if (this.state.Password != "")
      this.setState({ HasPasswordError: false });
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
    Swal.fire({
        title: 'אוי',
        text: 'עלייך לבקש מהמחנך שיאפס לך את הסיסמה',
        icon: 'warning',
        confirmButtonColor: 'rgb(135, 181, 189)',
      })
  }

  saveCredentials = (Phone, Password) => {
    // שמירה של השם משתמש והסיסמה בסשן סטורג' כדי שתהיה בדיקה של פרטי החיבור בטעינה של כל עמוד בהמשך
    sessionStorage.setItem('Spassword', Password);
    sessionStorage.setItem('SPhone', Phone);

    //אם מסומן זכור אותי שומר בלוקל סטורז
    if ($('#remember').prop('checked') === true) {
      localStorage.setItem('SPhone', Phone);
      localStorage.setItem('Spassword', Password);
      localStorage.setItem('userType', 'student');
    }
  }

  Submit = (event) => {
    const user = this.context;
    if (!this.state.HasPhoneValError && !this.state.HasPasswordError) //אם אין הערות
    {
      const { Phone, Password } = this.state;
      //בעזרת גט בודק אם השם משתמש וססמה קיימים במערכת
      fetch(this.apiUrl + '?phone=' + Phone + '&password=' + Password
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
            console.log("Submit= ", result[0]);
            if (result != 0) { //אם התלמיד קיים בדאטה בייס
              this.saveCredentials(Phone, Password); //תשמור פרטי חיבור בלוקאל סטורג' ובסשן סטורג'
              user.setStudent(result[0].studentID); //אם קיים אז תשמור בקונטקט
              user.setTeacher(result[0].teacherID); //אם קיים אז תשמור בקונטקט
              this.props.history.push('/StudentHomePage');
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

  render() {
    const {
      Phone,
      Password,
      validate,
      newPassword1, newPassword2
    } = this.state;

    return (
      <div className="studentPage">
         <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => this.props.history.push('/')} size={40} />
                </div>
        <div className="loginDiv">
          <div className="col-12">
            <img className="logoImgLoginTeacher" src={require('../../../img/logoChallengeMe.svg')} />
          </div>
          <form onSubmit={this.Submit}>
            <div className="form-group col-12">
            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'phone',
                            type: 'text',
                            placeholder: 'מספר הפלאפון של התלמיד',
                            className: "form-control inputRounded"
                        }}

                        value={Phone}
                        validationCallback={res =>
                            this.setState({ HasPhoneValError: res, validate: false })
                        }
                        onChange={(Phone, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ Phone });
                            console.log(e);
                        }}
                        onBlur={(e) => {
                            console.log(e);
                        }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                        validationOption={{
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: Phone => {
                                const reg = /^0\d([\d]{0,1})([-]{0,1})\d{8}$/;
                                if (reg.test(Phone)) {
                                    return true;
                                } else {
                                    this.setState({ HasPhoneValError: true });
                                    return "is not a valid phone number";
                                }
                            }
                        }}
                    />
            
            </div>
            <div className="form-group col-12">
            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'apasswordId',
                            type: 'password',
                            placeholder: 'הזן סיסמה',
                            className: "form-control inputRounded"
                        }}

                        value={Password}
                        validationCallback={res =>
                            this.setState({ HasPasswordError: res, validate: false })
                        }
                        onChange={(Password, e) => { //כל שינוי הוא שומר בסטייט
                            this.setState({ Password });
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
                                    this.setState({ HasPasswordError: true });
                                    return "Minimum 5 characters, at least one letter and one number";
                                }
                            }
                        }}
                    />
            </div>

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