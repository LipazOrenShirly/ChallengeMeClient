import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherInfoScreen.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo';
import $ from 'jquery';
import NavBar from '../../LittleComponents/NavBar';
import localHost from '../../LittleComponents/LocalHost';
import  ProjectContext from '../../../Context/ProjectContext';

export default class CCTeacherInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: {}
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

<<<<<<< HEAD
    static contextType = ProjectContext;              //קשור לאופציה ראשונה לשימוש בקונטקסט

    componentWillMount() {
        const { teacherID } = this.context;           //קשור לאופציה ראשונה לשימוש בקונטקסט
=======
    static contextType = ProjectContext;  

    componentDidMount() {
        const user = this.context; 
>>>>>>> fb14449d5d6d644b1c87c605784378bf9e699e51

        console.log('teacherID = '+JSON.stringify(user.teacherID));
        fetch(this.apiUrl + '?teacherID/'+user.teacherID
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
                    console.log("teacher= ", result);
                    this.setState({ teacher: result[0] });
                    console.log(this.state.teacher);
                },
                (error) => {
                    console.log("err get=", error);
                })
            .then(() => {
                $('#UpdateTFirstName').val(this.state.teacher.firstName);
                $('#UpdateTLastName').val(this.state.teacher.lastName);
                $('#UpdateTUserName').val(this.state.teacher.userName);
                $('#UpdateTMail').val(this.state.teacher.mail);
                $('#UpdateTPhone').val(this.state.teacher.phone);
                $('#UpdateTPassword').val(this.state.teacher.password);
                $('#UpdateTPassword2').val(this.state.teacher.password);
                $('#UpdateTSchool').val(this.state.teacher.school);
            });
    }

    EnableFields = () => {
        $('.inputUpdateTeacher').prop("disabled", false);
        $('#submit').hide();
        $('.hideFirst').css("display", "inline-block")
    }

    UpdateDetails = (event) => {
        var updatedDetails = {
            firstName: $('#UpdateTFirstName').val(),
            lastName: $('#UpdateTLastName').val(),
            userName: $('#UpdateTUserName').val(),
            mail: $('#UpdateTMail').val(),
            phone: $('#UpdateTPhone').val(),
            password: $('#UpdateTPassword').val(),
            school: $('#UpdateTSchool').val(),
            teacherID: 8
        }
        fetch(this.apiUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedDetails),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch PUT= ", result);
                },
                (error) => {
                    console.log("err PUT=", error);
                });
        // event.preventDefault();
        // window.location.reload();
    }

    btnClick = () => {
        if (window.confirm("אתה בטוח שאתה רוצה לבטל את השינויים?")) //נפתח לו חלון, אם לוחץ אישור זה מבטל ומרענן את הדף אם לוחץ לא לא קורה כלום
            window.location.reload();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="loginDiv">
                    <NavBar></NavBar><br />
                    <form onSubmit={this.UpdateDetails}>
                        <div className="myInformation">הפרטים שלי</div>
                        <div className="form-group col-12">
                            <input type="text" className="form-control inputUpdateTeacher" id="UpdateTFirstName" placeholder="שם פרטי" pattern="[א-ת]+" disabled></input>
                        </div>
                        <div className="form-group col-12">
                            <input type="text" className="form-control inputUpdateTeacher" id="UpdateTLastName" placeholder="שם משפחה" pattern="[א-ת]+" disabled></input>
                        </div>
                        <div className="form-group col-12">
                            <input type="text" className="form-control inputUpdateTeacher" id="UpdateTUserName" placeholder="שם משתמש" disabled></input>
                        </div>
                        <div className="form-group col-12">
                            <input type="mail" className="form-control inputUpdateTeacher" id="UpdateTMail" placeholder="כתובת מייל" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" disabled></input>
                        </div>
                        <div className="form-group col-12">
                            <input type="phone" className="form-control inputUpdateTeacher" id="UpdateTPhone" placeholder="פלאפון" pattern="[0][5][0-9]{8}$" disabled></input>
                        </div>
                        <div className="form-group col-12">
                            <input type="password" className="form-control inputUpdateTeacher" id="UpdateTPassword" placeholder="הזן ססמה" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" disabled></input>
                        </div>
                        {/* Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters   */}
                        <div className="form-group col-12">
                            <input type="password" className="form-control inputUpdateTeacher" id="UpdateTPassword2" placeholder="הזן ססמה בשנית" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" disabled></input>
                        </div>
                        <div className="form-group col-12">
                            <input type="text" className="form-control inputUpdateTeacher" id="UpdateTSchool" placeholder="מוסד לימודים שהינך מלמד בו" disabled></input>
                        </div>
                        <div className="col-12">
                            <button type="button" id="submit" className="btn btn-info btnYellow" onClick={this.EnableFields} >עדכן פרטים</button>
                        </div>
                        <div className="col-12 hideFirst" >
                            <button type="button" id="cancel" className="btn btn-info col-4 btnYellow cencelBtn" onClick={this.btnClick} >בטל</button>
                            <button type="submit" id="save" className="btn btn-info col-8 btnYellow"  >שמור</button>
                        </div>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        );
    };
}