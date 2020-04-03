import React, { Component } from 'react';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import '../../../css/Style.css';
import './styleTeacherLogin.css';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import Swal from 'sweetalert2'
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';


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
      showChangePassword: false
    };

    let local = true;
    this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
    if (!local) {
      this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
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

  static contextType = ProjectContext;

  Submit = (event) => {
    const user = this.context;
    if (!this.state.HasUserNameValError && !this.state.HasPasswordError) //אם אין הערות
    {
      const { Username, Password } = this.state;


      // שמירה של השם משתמש והסיסמה בסשן סטורג' כדי שתהיה בדיקה של פרטי החיבור בטעינה של כל עמוד בהמשך
      sessionStorage.setItem('password', Password);
      sessionStorage.setItem('username', Username);

      //אם מסומן זכור אותי שומר בלוקל סטורז
      if ($('#remember').prop('checked') === true) {
        localStorage.setItem('username', Username);
        localStorage.setItem('password', Password);
      }


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
              user.setTeacher(result.TeacherID); //אם קיים שמור בקונטקט


              if (result.TempPassword == 0)//אם לא סיסמה זמנית תעבור לעמוד הבא
                this.props.history.push('/HomePageTeacher/');

              else {//אם זה סיסמה זמנית אז

                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // this.setState({ showChangePassword: true });
                const { value: formValues } = Swal.fire({
                  title: 'הכנס ססמה חדשה',
                  html:
                    `<input type="password" placeholder="הזן ססמה חדשה" id="swal-input1"  class="swal2-input inputRounded">
                    <input type="password" placeholder="הזן ססמה שנית" id="swal-input2" class="swal2-input inputRounded">`,
                  focusConfirm: false,
                  showCloseButton: true,
                  showCancelButton: true,
                  cancelButtonText:
                    '<i class="fa fa-thumbs-down">בטל</i>',
                  cancelButtonAriaLabel: 'Thumbs down',
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> אשר',
                  confirmButtonAriaLabel: 'Thumbs up, great!',

                  preConfirm: () => {
                    return [
                      document.getElementById('swal-input1').value,
                      document.getElementById('swal-input2').value
                    ]

                  }
                })

                if (formValues) {
                  Swal.fire(JSON.stringify(formValues))
                }

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
      <div className="container-fluid">
        <div className="loginDiv">

          <div className="col-12">
            <img className="logoImgLoginTeacher" src={require('../../../img/logoChallengeMe.svg')} />
          </div>
          <form onSubmit={this.Submit}>
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
                  customFunc: pas => { //Minimum eight characters, at least one letter, one number and one special character:                                            :
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

            <div className="rememberMeDiv">
              <label>
                זכור אותי&nbsp;&nbsp;
                <input type="checkbox" name="remember" id="remember" />
              </label>
            </div><br />
            <div className="col-12">
              <button type="submit" id="submit" className="btn btn-info btnYellow">כניסה</button>
              <div id="errorFromServer" className="react-inputs-validation__error___2aXSp"></div>
            </div>
            <h5 onClick={this.ForgetPassword}> שכחתי סיסמה</h5>
            {/* <SweetAlert
        show={this.state.showChangePassword}
        title="אנא הכנס ססמה חדשה"
        text="הכנס ססמה חדשה כאן"
        input="text"
        //  html={`<div>
        //  <div className="form-group col-12">
        //                     <input type="text" className="form-control inputRounded" id="NewTLastName" placeholder="שם משפחה" pattern="[א-ת]+" required
        //                      />
        //                 </div>
        //                 <div className="form-group col-12">
        //                     <input type="text" className="form-control inputRounded" id="NewTUserName" placeholder="שם משתמש" required
        //                       />
        //                 </div>
        //  </div>`}

        icon="success"
        onConfirm={() => this.setState({ showChangePassword: false })}
      /> */}
            {/* <SweetAlert
              input
              inputType="password"
              show={this.state.showChangePassword}
              title="Enter Password"
              
              // required
              // validationMsg="You must enter your password!"
              onConfirm={this.onRecieveNewPassword}
            >
</SweetAlert> */}
            {/* <div><input type="password" id="swal-input1" class="swal2-input"><input  type="password" id="swal-input2" class="swal2-input"></input></div> */}

          </form>
          <div onClick={this.NewTeacher}>
            <h6> משתמש חדש? הרשם כאן</h6>
          </div>
        </div>
      </div>
    );
  };
}