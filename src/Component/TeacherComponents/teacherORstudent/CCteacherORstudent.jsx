import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/Style.css';
import './styleteacherORstudent.css'
import localHost from '../../LittleComponents/LocalHost';
import ProjectContext from '../../../Context/ProjectContext';
import Swal from 'sweetalert2';

export default class CCteacherORstudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showRender: false
        }
        let local = false;
        this.apiUrlTeacher = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrlTeacher = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';
            this.apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    async componentDidMount() {
        //לפני שעולה העמוד- אם קיימים שם משתמש וססמה בלוקל סטורז' אז תשמור אותם במשתנה
        var Tusername = await localStorage.getItem('username') != null ? localStorage.getItem('username') + '' : "";
        var Tpassword = await localStorage.getItem('password') != null ? localStorage.getItem('password') + '' : "";
        var Spassword = await localStorage.getItem('Spassword') != null ? localStorage.getItem('Spassword') + '' : "";
        var SPhone = await localStorage.getItem('SPhone') != null ? localStorage.getItem('SPhone') + '' : "";

        var userType = await localStorage.getItem('userType') != null ? localStorage.getItem('userType') + '' : "";

        // לפני שעולה העמוד עושים בדיקה האם פרטי החיבור בלוקאל סטורג' תקינים ואם כן עובר ישירות לדף הבית
        if (Tusername != "" && Tpassword != "" && userType == "teacher")
            await this.checkTeacherCredentials(Tusername, Tpassword);
        if (Spassword != "" && SPhone != "" && userType == 'student')
            await this.checkStudentCredentials(Spassword, SPhone);
        else
            await this.setState({ showRender: true });
    }

    checkTeacherCredentials = (Tusername, Tpassword) => {
        const user = this.context;
        //בעזרת גט בודק אם השם משתמש והסיסמה מהלוקאל סטורג' קיימים במערכת ואם כן מעביר ישירות לעמוד הבית
        fetch(this.apiUrlTeacher + '?username=' + Tusername + '&password=' + Tpassword
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
                    console.log("Submit= ", result);
                    console.log("Submit= ", JSON.stringify(result));
                    if (result.TeacherID != 0) { //אם המורה קיים בדאטה בייס
                        user.setTeacher(result.TeacherID); //אם קיים אז תשמור בקונטקט
                        if (result.TempPassword == 0)//אם לא סיסמה זמנית תעבור לעמוד הבא
                            this.props.history.push('/HomePageTeacher/');
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

    checkStudentCredentials = (Spassword, SPhone) => {
        const user = this.context;
        //בעזרת גט בודק אם השם משתמש והסיסמה מהלוקאל סטורג' קיימים במערכת ואם כן מעביר ישירות לעמוד הבית
        fetch(this.apiUrlStudent + '?phone=' + SPhone + '&password=' + Spassword
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
                        user.setStudent(result[0].studentID); //אם קיים אז תשמור בקונטקט
                        user.setTeacher(result[0].teacherID); //אם קיים אז תשמור בקונטקט
                        this.props.history.push('/StudentHomePage');
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

    heIsStudent = () => {
        this.props.history.push({
            pathname: '/StudentLogin',
        })
    }
    heIsTeacher = () => {
        this.props.history.push({
            pathname: '/TeacherLogin',
        })
    }

    render() {
        return (
            <div className="container-fluid col-xs-12 screentos" >
                {this.state.showRender && <div className="containerTeacherOrStudent">
                    <h1>האם אתה</h1>
                    <div className="col-12"><button type="button" onClick={this.heIsTeacher} className="btn btn-light btnpinkTotS col-5">מורה</button>

                        <button type="button" className="btn btn-info btnpinkTotS btnPinkTOS col-5" onClick={this.heIsStudent}>תלמיד</button></div>
                </div>}
            </div>
        );
    };
}