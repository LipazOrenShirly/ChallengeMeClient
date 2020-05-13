import React, { Component } from 'react';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import './stayleStudentLogin.css';
import '../../../css/Style.css';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import Swal from 'sweetalert2';
import { TiArrowBack } from 'react-icons/ti';
import { askForPermissioToReceiveNotifications } from '../../../push-notification';

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
      student: {}
    };
    let local = false;
    this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
    this.apiUrlAlert = 'http://localhost:' + { localHost }.localHost + '/api/Alert';
    this.apiUrlTeacher = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
    if (!local) {
      this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
      this.apiUrlAlert = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Alert';
      this.apiUrlTeacher = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';
    }
  }

  static contextType = ProjectContext;

  async componentDidMount() {
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
    // אם לא כתב מספר טלפון תקין עושה הודעה ויוצא מהפונקציה
    if (this.state.Phone == null || this.state.HasPhoneValError) {
      Swal.fire({
        title: 'שים לב',
        text: 'עליך למלא את מספר הטלפון שלך',
        icon: 'warning',
        confirmButtonColor: 'rgb(135, 181, 189)',
      });
      return;
    }

    // מוצא את התלמיד בדאטה בייס לפי המספר טלפון
    fetch(this.apiUrl + '/GetStudentByPhone?phone=' + this.state.Phone
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
          console.log("student= ", result);
          if (result.StudentID != 0)
            this.setState({ student: result }, this.x);
          else {
            Swal.fire({
              title: 'אוי',
              text: 'מספר הטלפון לא קיים במערכת',
              icon: 'warning',
              confirmButtonColor: '#e0819a',
            })
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

  x = () => {
    Swal.fire({
      title: 'שים לב',
      text: "?האם אתה רוצה לבקש מהמורה לאפס לך את הסיסמה",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(135, 181, 189)',
      cancelButtonColor: '#867D95',
      cancelButtonText: 'בטל',
      confirmButtonText: 'כן'
    }).then((result) => {
      if (result.value) {  //אם בחר אישור
        if (this.state.Phone == null) {
          Swal.fire({
            title: 'שים לב',
            text: 'עליך למלא את מספר הטלפון שלך',
            icon: 'warning',
            confirmButtonColor: 'rgb(135, 181, 189)',
          })
        }
        else this.sendPasswordRestartRequestToTeacher();
      }
      else {   //אם בחר בטל
        Swal.fire({
          title: 'בסדר',
          text: 'הסיסמה לה השתנתה',
          icon: 'success',
          confirmButtonColor: 'rgb(135, 181, 189)',
        })
      }
    });
  }

  sendPasswordRestartRequestToTeacher = async () => {
    const user = this.context;
    var student = this.state.student;
    // ליצור התראה ולעשות לה פוסט לטבלת התראות
    var alertTitle = await ' ' + student.FirstName + ' ' + student.LastName + ' ביקש לאפס סיסמה ';
    var alertText = await 'אנא אפס סיסמה לתלמיד ותמסור לו את הסיסמה החדשה';

    const date = await new Date();

    var alert = await {
      teacherID: student.TeacherID,
      studentID: student.StudentID,
      alertTitle: alertTitle,
      alertText: alertText,
      alertDate: date.toISOString().split('T')[0],
      alertTime: date.getHours() + ":" + date.getMinutes(),
    }

    await fetch(this.apiUrlAlert, {
      method: 'POST',
      body: JSON.stringify(alert),
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
          Swal.fire({
            title: 'נשלחה בקשה',
            text: 'נשלחה בקשה למורה שלך, תמתין לתגובה ממנו',
            icon: 'success',
            confirmButtonColor: 'rgb(135, 181, 189)',
          });
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

    // להביא מהדאטה בייס את הטוקן של המורה
    var teacherToken = await '';
    await fetch(this.apiUrlTeacher + '/getTeacherToken?teacherID=' + this.state.student.TeacherID
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
          console.log("student= ", result);
          if (result == null)
            Swal.fire({
              title: 'אוי',
              text: 'הפעולה נכשלה, נסה שנית',
              icon: 'warning',
              confirmButtonColor: '#e0819a',
            });
          else {
            teacherToken = result;
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

    // לעשות פוסט לפיירבייס
    var notification = await {
      "notification": {
        "title": alertTitle,
        "body": alertText,
        "click_action": "https://challengeme.netlify.app/",
        "icon": "http://url-to-an-icon/icon.png"
      },
      "to": teacherToken
    }
    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: 'POST',
      body: JSON.stringify(notification),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'key=AAAAB9pd-t0:APA91bFqlbdOGpqVbNifFlo-_2p9uPFoFqqi0iY5O-_bFjMuzYgVlxC7uC9xRQEprfEqdiDjsNEremg7RWBHlyMQhlhC1Hxo_ZPUsjCYTPUS3nu4cMQJ3tXhUImmftNhg3TPjlN1Wq1G'
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
        });
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
        if (!res.ok)
          throw new Error('Network response was not ok.');
        return res.json();
      })
      .then(
        (result) => {
          console.log("Submit= ", result[0]);
          if (result != 0) { //אם התלמיד קיים בדאטה בייס             
            this.saveCredentials(Phone, Password); //תשמור פרטי חיבור בלוקאל סטורג' ובסשן סטורג'
            user.setStudent(result[0].studentID); //אם קיים אז תשמור בקונטקט
            user.setTeacher(result[0].teacherID); //אם קיים אז תשמור בקונטקט 
            this.saveStudentToken(); //יצירת תוקן למשתמש ושמירה שלו בטבלת תלמידים
            this.props.history.push('/StudentHomePage');
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

saveStudentToken = async () => {
  const user = await this.context;

  var token = await askForPermissioToReceiveNotifications(); //יצירת תוקן למשתמש
  var tokenString = await Promise.resolve(token).then((val) => val);
  user.setStudentToken(tokenString);
  var data = await {
    studentID: user.studentID,
    studentToken: tokenString
  }

  //פקודת פוסט ששומרת את התוקן של המשתמש בטבלת תלמידים
  await fetch(this.apiUrl + '/studentToken', {
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
        Swal.fire({
          title: 'אוי',
          text: 'הפעולה נכשלה, נסה שנית',
          icon: 'warning',
          confirmButtonColor: '#e0819a',
        })
      });
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