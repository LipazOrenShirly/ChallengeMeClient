import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherForgetPassword.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'

export default class CCTeacherForgetPassword extends Component {
    constructor(props){
        super(props);
    } 
    
    render() {
        return (
            <div className="container-fluid">
               <Logo></Logo>
               <div className="col-10 ForgetPasswordDov" align="right">
                   <div>?שכחת ססמה</div>
                   <div className="marginBottom">לא נורא, הזן את כתובת המייל איתה נרשמת ונשלח לך סיסמה חדשה</div>
                   <br/>
                   <form>
                   <div className="form-group">
                <input type="mail" className="form-control col-12 inputRounded" id="NewTMail"  placeholder="כתובת מייל" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></input>
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