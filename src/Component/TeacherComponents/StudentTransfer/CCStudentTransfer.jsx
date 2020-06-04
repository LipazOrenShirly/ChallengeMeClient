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
            studentIDToTransfer: "",
            teacherIDToTransfer: "",
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

    onInputChangeStudent = (event, value) => {
        alert(value != null ? value.studentID : "no selection");
        var studentID = value != null ? value.studentID : "";
        this.setState({ studentIDToTransfer: studentID });
    }
    
    onInputChangeTeacher = (event, value) => {
        alert(value != null ? value.teacherID : "no selection");
        var teacherID = value != null ? value.teacherID : "";
        this.setState({ teacherIDToTransfer: teacherID });
    }

    Submit = (event) => {
        event.preventDefault();
        this.postTransfer();
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
                    this.props.history.push( '/HomePageTeacher' );
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

    render() {
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">שיוך תלמיד למורה אחר מאותו מוסד לימודי</div>
                <br />
                <form onSubmit={this.Submit}>
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