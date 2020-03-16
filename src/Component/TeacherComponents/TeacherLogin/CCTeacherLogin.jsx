import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherLogin.css'



export default class CCTeacherLogin extends Component {
  constructor(props) {
    super(props);

  }


  NewTeacher = () => {
    this.props.history.push({
      pathname: '/newTeacher',
    })
  }
  ForgetPassword = () => {
    this.props.history.push({
      pathname: '/TeacherForgetPassword',
    })
  }
  Submit = () => {
    this.props.history.push({
      pathname: '/HomePageTeacher',
    });
    // sessionStorage.setItem('usename', 'value');
    // sessionStorage.setItem('password', 'value');
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="loginDiv">
          <div className="col-12">
            <img className="logoImgLoginTeacher" src={require('../../../img/logoChallengeMe.svg')} />
          </div>
          <form onSubmit={this.Submit}>
            <div className="form-group col-12">
              <input type="text" className="form-control inputRounded" id="unameId" placeholder="הכנס שם משתמש" required
              onChange={(e)=>sessionStorage.setItem('username', e.target.value)}/>
            </div>
            <div className="form-group col-12">
              <input type="password" className="form-control inputRounded" id="apasswordId" placeholder="הכנס ססמה" required 
              onChange={(e)=>sessionStorage.setItem('password', e.target.value)}/>
            </div>
            <div className="rememberMeDiv">
              <label>
                זכור אותי&nbsp;&nbsp;
                <input type="checkbox" name="remember"></input>
              </label>
            </div><br />

            <div className="col-12">
              <button type="submit" id="submit" className="btn btn-info btnYellow">כניסה</button>
            </div>
            <h5 onClick={this.ForgetPassword}> שכחתי ססמה</h5>
          </form>

          <div onClick={this.NewTeacher}>
            <h6> משתמש חדש? הרשם כאן</h6>
          </div>
        </div>
      </div>
    );
  };
}