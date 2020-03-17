import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherLogin.css'
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery'

export default class CCTeacherLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachersFromDB: []
    };
    let local = true;
    this.apiUrl = 'http://localhost:' + {localHost}.localHost + '/api/Teacher';
    if (!local) {
      this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
    }
  }

  componentDidMount = () => {
    $('#unameId').val(localStorage.getItem('username')!=null ? localStorage.getItem('username')+'' : "");
    $('#apasswordId').val(localStorage.getItem('password')!=null ? localStorage.getItem('password')+'' : "");
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

  Submit = (event) => {
    var username = $('#unameId').val();
    var password =  $('#apasswordId').val();

    sessionStorage.setItem('password', password);
    sessionStorage.setItem('username', username);
    this.setState({password: password});
    this.setState({username: username});

    if($('#remember').prop('checked') === true) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }

    fetch(this.apiUrl+'?username='+username+'&password='+password 
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
          console.log("Submit= ", JSON.stringify(result));
          this.setState({teachersFromDB:JSON.stringify(result)})
          console.log('state.teachersFromDB = '+this.state.teachersFromDB);
          this.props.history.push('/HomePageTeacher/', {teachersFromDB: this.state.teachersFromDB});
        },
        (error) => {
          console.log("err get=", error);
        });
      event.preventDefault();
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
              <input type="text" className="form-control inputRounded" id="unameId" placeholder="הכנס שם משתמש" required/>
            </div>
            <div className="form-group col-12">
              <input type="password" className="form-control inputRounded" id="apasswordId" placeholder="הכנס ססמה" required/>
            </div>
            <div className="rememberMeDiv">
              <label>
                זכור אותי&nbsp;&nbsp;
                <input type="checkbox" name="remember" id="remember"/>
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