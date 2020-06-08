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
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';

class CCStudentTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsArr: [],
            teachersArr: [],
            transfersArr: [],
            studentIDToTransfer: null,
            teacherIDToTransfer: null,
            comment: "",
            transferNewStudent: false,
            clearSelection: null
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
        const user = this.context;
        fetch(this.apiUrlTeacher+'/GetTeachersByInstitution?teacherID='+user.teacherID
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
                    this.setState({ teachersArr: result.filter(item => item.teacherID != user.teacherID) })
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
        fetch(this.apiUrlTransfer + '/getTransfers?teacherID=' + user.teacherID
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
        var studentID = value != null ? value.studentID : null;
        this.setState({ studentIDToTransfer: studentID });
    }

    onInputChangeTeacher = (event, value) => {
        var teacherID = value != null ? value.teacherID : null;
        this.setState({ teacherIDToTransfer: teacherID });
    }

    //------שליחת בקשה-------
    SubmitTransfer = (event) => {
        event.preventDefault();
        if (this.state.teacherIDToTransfer == null || this.state.studentIDToTransfer == null) {
            $('#StudentTeacherError').empty();
            $('#StudentTeacherError').append("יש לבחור תלמיד ומורה");
            return;
        }
        //בדיקה האם כבר קיימת בקשה כזאת
        if (this.checkIfExists()) {
            Swal.fire({
                title: 'אוי',
                text: 'הבקשה כבר קיימת וממתינה לאישור של המורה',
                icon: 'warning',
                confirmButtonColor: '#e0819a',
            });
            return;
        }
        //פוסט לבקשה להעברה
        this.postTransfer();
        //פוסט התראה לפיירבייס --לבקשה-- להעברה
        var alertTitle = 'ישנה העברה חדשה לאישור';
        var alertText = 'נשלחה לך בקשה להעברת תלמיד חדש';
        this.getTeacherToken(this.state.teacherIDToTransfer, alertTitle, alertText);
        // this.postAlertTFirebase(alertTitle, alertText, teacherToken);
    }

    //----אישור העברה------
    confirmTransfer = async (transferID, classID, studentID, teacherFrom) => {
        //פוט לתלמיד 
        await this.changeTeacherIDandClass(studentID, classID, transferID);

        //פוסט התראה לפיירבייס --לאישור-- להעברה
        var alertTitle = await 'בקשה להעברת תלמיד אושרה';
        var alertText = await '';
        await this.getTeacherToken(teacherFrom, alertTitle, alertText);
        var alertTitleS = await 'הועברת למורה אחר';
        var alertTextS = await '';
        await this.getStudentToken(studentID, alertTitleS, alertTextS);
        // await this.postAlertTFirebase(alertTitle, alertText, teacherToken);
        //התראה לתלמיד


    }

    //-----דחיית בקשה--------
    declineTransfer = async (transferID, teacherFrom) => {
        //פוט לטבלת העברות לעדכון סטטוס  
        await this.putTransferStatus(transferID, 3);
        //פוסט התראה לפיירבייס --לאישור-- להעברה
        var alertTitle = await 'בקשה להעברת תלמיד נדחתה';
        var alertText = await '';
        await this.getTeacherToken(teacherFrom, alertTitle, alertText);
        // await this.postAlertTFirebase(alertTitle, alertText, teacherToken);
    }

    //-----ביטול בקשה--------
    cancelTransfer = (transferID) => {
        //פוט לטבלת העברות לעדכון סטטוס  
        this.putTransferStatus(transferID, 4);
    }

    changeTeacherIDandClass = (studentID, classID, transferID) => {
        const user = this.context;
        var studentAndClassObj = {
            studentID: studentID,
            classID: classID,
            teacherID: user.teacherID
        }
        fetch(this.apiUrlStudent + '/changeTeacherIDandClass'
            , {
                method: 'PUT',
                body: JSON.stringify(studentAndClassObj),
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
                    //פוט לטבלת העברות לעדכון סטטוס  
                    this.putTransferStatus(transferID, 2);
                    this.getTransfersRequests();

                },
                (error) => {
                    console.log("err get=", error);
                    // //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'אישור ההעברה לא התבצעת אנא נסה שוב',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });
    }

    checkIfExists = () => {
        const user = this.context;
        var filteredTransferArr = this.state.transfersArr.filter(item =>
            item.teacherFrom == user.teacherID && item.teacherTo == this.state.teacherIDToTransfer && item.studentID == this.state.studentIDToTransfer && item.status == 1
        );
        return filteredTransferArr.length > 0  //מחזיר טרו אם קיימת כבר העברה ומחזיר פולס אם לא קיימת 
    }

    postTransfer = () => {
        const user = this.context;
        var transfer = {
            teacherFrom: user.teacherID,
            teacherTo: this.state.teacherIDToTransfer,
            studentID: this.state.studentIDToTransfer,
            comment: this.state.comment,
            date: new Date().toISOString().split('T')[0],
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
                    this.setState({ clearSelection:true, comment: "" });
                    // this.props.history.push('/HomePageTeacher');
                    this.getTransfersRequests();
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

    putTransferStatus = (transferID, status) => {    //פוט לטבלת העברות לשינוי עמודת קונפירם לטרו
        fetch(this.apiUrlTransfer + '/updateTransfer?transferID=' + transferID + '&status=' + status
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
                    this.getTransfersRequests();
                },
                (error) => {
                    console.log("err get=", error);
                    // //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'אישור ההעברה לא התבצעת אנא נסה שוב',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });
    }

    postAlertTFirebase = (alertTitle, alertText, teacherToken) => {        //פוסט התראה לפיירבייס --לאישור-- להעברה
        //יצירת אובייקט נוטיפיקיישן ופוסט לפיירבייס
        var notification = {
            "notification": {
                "title": alertTitle,
                "body": alertText,
                "click_action": "https://challengeme.netlify.app/",
                "icon": "http://url-to-an-icon/icon.png"
            },
            "to": teacherToken
        }
        console.log(notification);
        fetch("https://fcm.googleapis.com/fcm/send", {
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
    getStudentToken = async (studentID, alertTitle, alertText) => {  // שליפת הטוקן של המורה אליו צריכה להישלח ההתראה
        const user = await this.context;
        await fetch(this.apiUrlStudent + '/getStudentToken?studentID=' + studentID
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
                    if (result != null) {

                        this.postAlertTFirebase(alertTitle, alertText, result);
                    }
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    getTeacherToken = async (teacherID, alertTitle, alertText) => {  // שליפת הטוקן של המורה אליו צריכה להישלח ההתראה
        const user = await this.context;
        await fetch(this.apiUrlTeacher + '/getTeacherToken?teacherID=' + teacherID
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
                    if (result != null) {

                        this.postAlertTFirebase(alertTitle, alertText, result);
                    }
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {

        const { transferNewStudent, comment, transfersArr } = this.state;
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">שיוך תלמיד למורה אחר מאותו מוסד לימודי</div>
                <br />
                {
                    transferNewStudent == false &&
                    <div className="col-12">
                        <button className="btn btn-info btnPink col-6" onClick={() => { this.setState({ transferNewStudent: true }) }} >העבר תלמיד חדש</button>
                    </div>
                }
                {
                    transferNewStudent == true &&

                    <form onSubmit={this.SubmitTransfer}>
                        <div className="form-group input-group col-12 bc" dir="rtl">
                            <FreeSoloGrouped
                                clear={this.state.clearSelection}
                                options={this.state.studentsArr}
                                onInputChange={this.onInputChangeStudent}
                                label="בחר תלמיד"
                                id='studentToTransfer' />
                        </div>
                        <div className="form-group input-group col-12 bc" dir="rtl">
                            <FreeSoloTeachers
                                clear={this.state.clearSelection}
                                options={this.state.teachersArr}
                                onChange={this.onInputChangeTeacher}
                                label='בחר מורה'
                                id='teacherToTransfer' />
                        </div>
                        <div className="col-12" dir="rtl">
                            <div className="notMust">-שדה רשות</div>
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    autoComplete: "off",
                                    id: 'comment',
                                    type: 'text',
                                    placeholder: 'כתוב הערה',
                                    className: "form-control inputRounded"
                                }}
                                value={comment}
                                onChange={(comment, e) => { //כל שינוי הוא שומר בסטייט
                                    this.setState({ comment });
                                }}
                                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                            />
                        </div>

                        <div className='errorInputuserName' id="StudentTeacherError"></div>
                        <div className="row btnTransferStudent justify-content-around">
                            <button className="btn btn-info btnPink btnHide col-4" onClick={() => { this.setState({ transferNewStudent: false }) }} >הסתר</button>
                            <button type="submit" className="btn btn-info btnPink col-6" >העבר את התלמיד</button>

                        </div>
                    </form>
                }
                <br />
                {
                    transfersArr.length > 0 &&
                    <div className="col-12 turkiz" style={{ marginBottom: '2%' }}>שיוכים שנעשו</div>

                }
                {transfersArr.map((item) =>
                    <CConeTransfer transferItem={item} cancelTransfer={this.cancelTransfer} declineTransfer={this.declineTransfer} confirmTransfer={this.confirmTransfer} />
                )}
            </div>
        );
    }
}

export default CCStudentTransfer;

