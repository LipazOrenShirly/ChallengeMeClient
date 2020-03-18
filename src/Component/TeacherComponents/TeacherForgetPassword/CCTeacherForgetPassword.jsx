import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherForgetPassword.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'
import localHost from '../../LittleComponents/LocalHost';

export default class CCTeacherForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: ""
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    Submit = (event) => {
        fetch(this.apiUrl + '?mail=' + this.state.mail,
            {
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
                    console.log("Submit= ", result);
                    this.props.history.push('/TeacherLogin', {randomPassword: result});
                },
                (error) => {
                    console.log("err get=", error);
                });
        event.preventDefault();
    }

    render() {
        return (
            <div className="container-fluid">
                <Logo></Logo>
                <div className="col-10 ForgetPasswordDov" align="right">
                    <div>?שכחת ססמה</div>
                    <div className="marginBottom">לא נורא, הזן את כתובת המייל איתה נרשמת ונשלח לך סיסמה חדשה</div>
                    <br />
                    <form onSubmit={this.Submit}>
                        <div className="form-group">
                            <input type="mail" className="form-control col-12 inputRounded" id="NewTMail" placeholder="כתובת מייל"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                required
                                onChange={(e) => this.setState({ mail: e.target.value })} />
                        </div>
                        <div className="text-center"><button type="submit" className="btn btn-light btnYellow" onClick={this.sendEmail}>שלח</button></div>
                    </form>
                </div>
                <div className="divForgetPasswordIMG"><img className="ForgetPasswordIMG" src={require('../../../img/forgetPasswordImg.png')} />
                </div>
                <Footer></Footer>
            </div>
        );
    };
}