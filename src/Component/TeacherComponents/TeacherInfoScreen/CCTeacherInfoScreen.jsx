import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherInfoScreen.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo';
import $ from 'jquery';
import NavBar from '../../LittleComponents/NavBar';

export default class CCTeacherInfoScreen extends Component {
    constructor(props){
        super(props);
    } 
    
    updateDetails=()=>{
        $('#UpdateTFirstName').prop("disabled", false);
        $('#UpdateTLastName').prop("disabled", false);
        $('#UpdateTUserName').prop("disabled", false);
        $('#UpdateTMail').prop("disabled", false);
        $('#UpdateTPhone').prop("disabled", false);
        $('#UpdateTPassword').prop("disabled", false);
        $('#UpdateTPassword2').prop("disabled", false);
        $('#UpdateTSchool').prop("disabled", false);
        $('#submit').hide();
        $('.hideFirst').css("display","inline-block")
    }
    btnClick=()=>{
        if(window.confirm("אתה בטוח שאתה רוצה לבטל את השינויים?")) //נפתח לו חלון, אם לוחץ אישור זה מבטל ומרענן את הדף אם לוחץ לא לא קורה כלום
            window.location.reload();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="loginDiv">
                <NavBar></NavBar><br/>
                <form onSubmit={(e) => {this.updateDetails(); e.preventDefault();}}>
                <div className="myInformation">הפרטים שלי</div>
              <div className="form-group col-12">
                <input type="text" className="form-control inputUpdateTeacher" id="UpdateTFirstName"  placeholder="שם פרטי" defaultValue="גדעון" pattern="[א-ת]+" disabled></input>
            </div>
            <div className="form-group col-12">
                <input type="text" className="form-control inputUpdateTeacher" id="UpdateTLastName" placeholder="שם משפחה" defaultValue="כהן" pattern="[א-ת]+" disabled></input>
            </div>
            <div className="form-group col-12">
                <input type="text" className="form-control inputUpdateTeacher" id="UpdateTUserName" placeholder="שם משתמש" defaultValue="גדעון123" disabled></input>
            </div>
            <div className="form-group col-12">
                <input type="mail" className="form-control inputUpdateTeacher" id="UpdateTMail"  placeholder="כתובת מייל" defaultValue="gidon@gmail.com"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" disabled></input>
            </div>
            <div className="form-group col-12">
                <input type="phone" className="form-control inputUpdateTeacher" id="UpdateTPhone" placeholder="פלאפון"  defaultValue="0545588756" pattern="[0][5][0-9]{8}$" disabled></input>
            </div>
            <div className="form-group col-12">
                <input type="password" className="form-control inputUpdateTeacher" id="UpdateTPassword" placeholder="הזן ססמה"  defaultValue="123456"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" disabled></input>
            </div>
     {/* Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters   */}
            <div className="form-group col-12">
                <input type="password" className="form-control inputUpdateTeacher" id="UpdateTPassword2"   placeholder="הזן ססמה בשנית" defaultValue="123456"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" disabled></input>
            </div>
            <div className="form-group col-12">
                <input type="text" className="form-control inputUpdateTeacher" id="UpdateTSchool"  placeholder="מוסד לימודים שהינך מלמד בו" defaultValue="בית ספר רימון" disabled></input>
            </div>
            <div className="col-12">
            <button type="submit" id="submit" className="btn btn-info btnYellow"  >עדכן פרטים</button>
            </div>
            <div className="col-12 hideFirst" >
            <button type="button" id="cancel" className="btn btn-info col-4 btnYellow cencelBtn" onClick={this.btnClick} >בטל</button>
            <button type="button" id="save" className="btn btn-info col-8 btnYellow"  >שמור</button>
            </div>

            </form>
            </div>
            <Footer></Footer>


              
            </div>

        );
    };
}