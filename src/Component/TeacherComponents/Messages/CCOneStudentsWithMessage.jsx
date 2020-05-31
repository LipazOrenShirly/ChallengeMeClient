import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import EmptyImgStudentBase64 from '../../LittleComponents/emptyImgStudent';
import Swal from 'sweetalert2';


export default class CCOneStudentsWithMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            UnReadCount: 0,
            dataImg: EmptyImgStudentBase64
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
            this.apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    async componentDidMount() {
        const user = await this.context;
        await this.getImage();
        // מחזירה אובייקט של תלמיד
        await fetch(this.apiUrlStudent + '?studentID=' + this.props.studentID
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
                    console.log("student= ", result[0]);
                    this.setState({ student: result[0] });
                    this.getUnReadAmount();
                    setInterval(this.getUnReadAmount, 5000);
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

    getImage = () => {
        fetch(this.apiUrlStudent + '/ImageStudent?studentID=' + this.props.studentID
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
                    //console.log(result);
                    this.setState({ dataImg: result })
                },
                (error) => {
                    console.log("err get=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })
            .then(() => {

            });
    }
    getUnReadAmount = () => {
        const user = this.context;
        // פונקציה שמחזירה כמה הודעות שלא נקראו יש מהתלמיד
        fetch(this.apiUrl + '?getter_teacherID=' + user.teacherID + '&sender_studentID=' + this.state.student.studentID
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
                    console.log("studentsArr= ", result);
                    this.setState({ UnReadCount: result });
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

    render() {

        return (<div>
            <div className="row rowOneSwithMes d-flex justify-content-end">
                <div dir="rtl" className="SwithMesDiv row" onClick={() => this.props.goToChat(this.state.student)}>
                    <div className="d-flex align-items-center">   {this.state.student.firstName} {this.state.student.lastName}</div>
                    {
                        this.state.UnReadCount != 0 &&
                        <div className="fixLeft">{this.state.UnReadCount}</div>
                    }

                    {/* <div className="fixLeft">{this.state.UnReadCount != 0 && this.state.UnReadCount}</div>  להציג איכשהו כמה הודעות שלא נקראו יש מהתלמיד */}

                </div>
                <img className="emptyUserImgMes" src={`data:image/jpeg;base64,${this.state.dataImg}`} />

            </div>
            <hr />
        </div>
        );
    };
}



