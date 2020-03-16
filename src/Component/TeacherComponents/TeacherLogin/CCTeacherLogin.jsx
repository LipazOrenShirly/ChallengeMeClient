import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherLogin.css'
import localHost from '../../LittleComponents/LocalHost';

export default class CCTeacherLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false,
      teachersFromDB: []
    };
    let local = true;
    this.apiUrl = 'http://localhost:' + {localHost}.localHost + '/api/Teacher';
    if (!local) {
      this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
    }
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
    if(this.state.remember === true) {
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('password', this.state.password);
    }

    // this.props.history.push({
    //   pathname: '/HomePageTeacher',
    // });

    var data ={
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password'),
    };

    fetch(this.apiUrl//+'?username='+data.username+'&password='+data.password 
    ,{
      method: 'GET',
      // mode: 'no-cors',
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
          console.log("Submit= ", result[0].teacherID);
          this.setState({teachersFromDB:result[0].teacherID})
        },
        (error) => {
          console.log("err get=", error);
        })
      .then(
        this.props.history.push({
          pathname: '/HomePageTeacher/'+this.state.teachersFromDB,
        })
      );
  }

  render() {
    {console.log('localHost='+{localHost}.localHost)}
    return (
      <div className="container-fluid">
        <div className="loginDiv">
          <div className="col-12">
            <img className="logoImgLoginTeacher" src={require('../../../img/logoChallengeMe.svg')} />
          </div>
          <form onSubmit={this.Submit}>
            <div className="form-group col-12">
              <input type="text" className="form-control inputRounded" id="unameId" placeholder="הכנס שם משתמש" required
                value={localStorage.getItem('username')}
                onChange={(e) => {
                  sessionStorage.setItem('username', e.target.value);
                  this.setState({username: e.target.value});
                }} />
            </div>
            <div className="form-group col-12">
              <input type="password" className="form-control inputRounded" id="apasswordId" placeholder="הכנס ססמה" required
                value={localStorage.getItem('password')}
                onChange={(e) => {
                  sessionStorage.setItem('password', e.target.value);
                  this.setState({password: e.target.value});
                  }} />
            </div>
            <div className="rememberMeDiv">
              <label>
                זכור אותי&nbsp;&nbsp;
                <input type="checkbox" name="remember" onChange={(e) => {
                  this.setState({remember: e.target.checked});
                  }}/>
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