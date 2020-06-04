import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudenTtransfer.css';
import NavBar from '../../LittleComponents/NavBar';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import { TiArrowBack } from 'react-icons/ti';
import ProjectContext, { user } from '../../../Context/ProjectContext';
import FreeSoloGrouped from '../../LittleComponents/FreeSoloGrouped';
import FreeSoloTeachers from '../../LittleComponents/FreeSoloTeachers';
import CConeTransfer from './CConeTransfer';
import $ from 'jquery';


class CCStudentTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsArr: [],
            teachersArr: [],
            transfersArr: [],
            studentIDToTransfer: "",
            teacherIDToTransfer: "",
            teacherToken: ""
        }
        let local = false;
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        this.apiUrlTeacher = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        this.apiUrlTransfer = 'http://localhost:' + { localHost }.localHost + '/api/Transfer';
        if (!local) {
            this.apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
            this.apiUrlTeacher = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';
            this.apiUrlTransfer = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Transfer';
        }
    }
    static contextType = ProjectContext;

    componentDidMount() {
        this.getStudents();
        this.getTeachers();
        this.getTransfersRequests();
    }

    // התהליך:
    // במסך אפשר ליצור בקשות להעברות וניתן לראות בקשות שממתינות לאישור שלך

    // יצירת בקשה:
    // במסך אפשר ליצור בקשה להעברה על ידי בחירת תלמיד להעברה ומורה אליו יועבר התלמיד
    // בלחיצה על העבר תלמיד:
    // 1. נוצרת שורה בטבלת העברות
    // 3. נשלחת התראה לפיירבייס

    // צפיה בבקשות שממתינות לאישור שלך:
    // יש גט שמביא את כל הבקשות שממתינות לאישור שלך
    // ברגע שמאשרים:
    // 1. מתעדכנת ההעברה בטבלת העברות לקונפירם טרו
    // 2. נשלחת התראה לפיירבייס
    // 3. פקודת פוט לטבלת תלמידים לעדכון המורה של התלמיד



    getStudents = () => {
        const user = this.context;
        fetch(this.apiUrlStudent + '/GetStudentsAndClassNameByTeacherID?teacherID=' + user.teacherID
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
                    console.log(result);
                    this.setState({ studentsArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'טעינת רשימת המורים לא הצליחה אנא נסה להכנס שוב לעמוד מחדש',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })
    }

    getTeachers = () => {
        fetch(this.apiUrlTeacher
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
                    console.log(result);
                    this.setState({ teachersArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'טעינת רשימת התלמידים לא הצליחה, אנא נסה להכנס לעמוד מחדש',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })
    }

    getTransfersRequests = () => {
        const user = this.context;
        fetch(this.apiUrlTransfer + '/getTransfersToTeacher?teacherID=' + user.teacherID
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
                    console.log(result);
                    this.setState({ transfersArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'טעינת רשימת הבקשות לשינוי שיוך התלמידים לא הצליחה, אנא נסה להכנס לעמוד מחדש',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })
    }

    onInputChangeStudent = (event, value) => {
        var studentID = value != null ? value.studentID : "";
        this.setState({ studentIDToTransfer: studentID });
    }

    onInputChangeTeacher = (event, value) => {
        var teacherID = value != null ? value.teacherID : "";
        this.setState({ teacherIDToTransfer: teacherID });
    }

    //------שליחת בקשה-------
    SubmitTransfer = (event) => {
        event.preventDefault();
        //פוסט לבקשה להעברה
        this.postTransfer(); 
        //פוסט התראה לפיירבייס --לבקשה-- להעברה
        var alertTitle = '';
        var alertText = '';
        this.postAlertTFirebase(alertTitle, alertText);    
    }

    //----אישור העברה------
    confirmTransfer = () => {
        //פוט לטבלת העברות לשינוי עמודת קונפירם לטרו
        this.putTransferConfirm(transferID);
        //פוסט התראה לפיירבייס --לאישור-- להעברה
        var alertTitle = '';
        var alertText = '';
        this.postAlertTFirebase(alertTitle, alertText);
    }

    postTransfer = () => {
        var transfer = {
            teacherFrom: user.teacherID,
            teacherTo: this.state.teacherIDToTransfer,
            studentID: this.state.studentIDToTransfer,
        }

        fetch(this.apiUrlTransfer,
            {
                method: 'POST',
                body: JSON.stringify(transfer),
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
                        title: 'מעולה',
                        text: 'הבקשה להעברת תלמיד נשלחה בהצלחה וממתינה לאישור המורה',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    });
                    this.postAlert();
                    this.props.history.push('/HomePageTeacher');
                },
                (error) => {
                    console.log("err post=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הבקשה להעברת תלמיד נכשלה, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    putTransferConfirm = (transferID) => {    //פוט לטבלת העברות לשינוי עמודת קונפירם לטרו
        fetch(this.apiUrlTransfer + '?transferID=' + transferID
            , {
                method: 'PUT',
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
                    console.log(result);
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'אישור ההעברה לא התבצעת אנא נסה שוב',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    postAlertTFirebase = async (alertTitle, alertText) => {        //פוסט התראה לפיירבייס --לאישור-- להעברה

        this.getTeacherToken();
        //יצירת אובייקט נוטיפיקיישן ופוסט לפיירבייס
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

    getTeacherToken = () => {  // שליפת הטוקן של המורה אליו צריכה להישלח ההתראה
        const user = await this.context;
        var teacherToken = await "";
        await fetch(this.apiUrlTeacher + '/getTeacherToken?teacherID=' + this.state.teacherIDToTransfer
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
                    console.log("TeacherToken= ", result);
                    if (result != null)
                        setState({ teacherToken: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">שיוך תלמיד למורה אחר מאותו מוסד לימודי</div>
                <br />
                <form onSubmit={this.SubmitTransfer}>
                    <div className="form-group input-group col-12 bc" dir="rtl">
                        <FreeSoloGrouped
                            options={this.state.studentsArr}
                            onInputChange={this.onInputChangeStudent}
                            label="שם התלמיד להעברה"
                            id='studentToTransfer' />
                    </div>
                    <div className="form-group input-group col-12 bc" dir="rtl">
                        <FreeSoloTeachers
                            options={this.state.teachersArr}
                            onChange={this.onInputChangeTeacher}
                            label='שם המורה אליו יועבר התלמיד'
                            id='teacherToTransfer' />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-info btnPink col-6" >העבר את התלמיד</button>
                    </div>
                </form>
                <br />
                <div className="col-12 turkiz">שיוכים שעלייך לאשר</div>
                <CConeTransfer />
                <CConeTransfer />
                <CConeTransfer />

            </div>
        );
    }
}

export default CCStudentTransfer;