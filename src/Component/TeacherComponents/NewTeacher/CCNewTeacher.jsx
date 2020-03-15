import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleNewTeacher.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'

export default class CCnewTeacher extends Component {
    constructor(props){
        super(props);
    } 
    
    render() {
        return (
            <div className="container-fluid">
                <div className="loginDiv">
                <Logo></Logo>
                <form>
              <div className="form-group col-12">
                <input type="text" className="form-control inputNewTeacher" id="NewTFirstName"  placeholder="שם פרטי" pattern="[א-ת]+" required></input>
            </div>
            <div className="form-group col-12">
                <input type="text" className="form-control inputNewTeacher" id="NewTLastName"  placeholder="שם משפחה" pattern="[א-ת]+" required></input>
            </div>
            <div className="form-group col-12">
                <input type="text" className="form-control inputNewTeacher" id="NewTUserName"  placeholder="שם משתמש" required></input>
            </div>
            <div className="form-group col-12">
                <input type="mail" className="form-control inputNewTeacher" id="NewTMail"  placeholder="כתובת מייל"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></input>
            </div>
            <div className="form-group col-12">
                <input type="phone" className="form-control inputNewTeacher" id="NewTPhone"  placeholder="פלאפון" pattern="[0][5][0-9]{8}$" required></input>
            </div>
            <div className="form-group col-12">
                <input type="password" className="form-control inputNewTeacher" id="NewTPassword"  placeholder="הזן ססמה"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required></input>
            </div>
     {/* Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters   */}
            <div className="form-group col-12">
                <input type="password" className="form-control inputNewTeacher" id="NewTPassword2"  placeholder="הזן ססמה בשנית"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required></input>
            </div>
            <div className="form-group col-12">
                <input type="text" className="form-control inputNewTeacher" id="NewTSchool"  placeholder="מוסד לימודים שהינך מלמד בו" required></input>
            </div>
            <div className="col-12">
            <button type="submit" id="submit" className="btn btn-info btnYellow">כניסה</button>
            </div>
            </form>
            </div>
            <Footer></Footer>


              
            </div>

        );
    };
}