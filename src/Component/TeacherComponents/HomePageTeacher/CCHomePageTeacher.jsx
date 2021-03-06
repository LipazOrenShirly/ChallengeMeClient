import React, { Component } from 'react';
import HorizontalScroller from 'react-horizontal-scroll-container';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCClasses from './CCClasses';
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';
import CCStudents from './CCStudents';
import ProjectContext from '../../../Context/ProjectContext';
import { TiArrowBack } from 'react-icons/ti';
import localHost from '../../LittleComponents/LocalHost';
import CCOneStudent from './CCOneStudent';
import Swal from 'sweetalert2';

export default class CCHomePageTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            class: {},
            studentPage: false,
            countMessages: null,
            countAlerts: null,
            input: "",
            studentsArr: [],
        };
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        this.apiUrlMessage = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        this.apiUrlAlert = 'http://localhost:' + { localHost }.localHost + '/api/Alert';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
            this.apiUrlMessage = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
            this.apiUrlAlert = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Alert';
        }
    }
    static contextType = ProjectContext;

    componentDidMount() {
        this.getDataOfMessagesNum();
        setInterval(this.getDataOfMessagesNum, 5000); // runs every 5 seconds.
    }

    getDataOfMessagesNum = () => {// runs every 5 seconds.
        //כאן צריך לעשות משיכה של מספר ההודעות וההתרעות שיש למורה הספיציפי הזה
        const user = this.context;

        // משיכה של מספר ההודעה שלא נקראו
        fetch(this.apiUrlMessage + '?teacherID_UnRead=' + user.teacherID
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
                    console.log("countMessages= ", result);
                    this.setState({ countMessages: result });
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });

        // משיכה של מספר ההתראות שלא נקראו
        fetch(this.apiUrlAlert + '?teacherID_UnRead=' + user.teacherID
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
                    console.log("countAlerts= ", result);
                    this.setState({ countAlerts: result });
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    // Swal.fire({
                    //     title: 'משהו השתבש',
                    //     text: 'הפעולה נכשלה, נסה שנית',
                    //     icon: 'warning',
                    //     confirmButtonColor: '#e0819a',
                    // })
                });
    }

    getDataFromClasses = (data) => {
        this.setState({ class: data });
        this.setState({ studentPage: true })
    }

    goToStudentPage = (data) => {
        this.props.history.push({
            pathname: '/StudentPage',
            state: { student: data }
        })
    }

    goToAddNewStudent = (classID) => {
        this.props.history.push({
            pathname: '/AddNewStudent',
            state: { classID: classID }
        })
    }

    sendInputToHomePage = (e) => {
        var str = e.target.value.replace("'", '');
        this.setState({ input: str });

        //מחזיר תלמידים שמתאימים לאינפוט
        const user = this.context;
        fetch(this.apiUrl + '?teacherID=' + user.teacherID + '&name=' + str
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
                    this.setState({ studentsArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'אנא נסה לחפש שוב',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    render() {
        const user = this.context;
        var { input } = this.state
        return (
            <div className="container-fluid">
                <NavBar />
                <br />

                <SearchBarHomeTeacher countMessages={this.state.countMessages} countAlerts={this.state.countAlerts} sendInputToHomePage={this.sendInputToHomePage} />
                
                {this.state.studentPage ? <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => this.setState({ studentPage: false })} size={40} />
                </div> : <br />}
                
                {this.state.input != "" &&
                    <div className="row col-12">
                        {this.state.studentsArr.map((item) =>
                            <CCOneStudent key={item.studentID} student={item} goToStudentPage={this.goToStudentPage} />
                        )}
                    </div>
                }
                {this.state.input == "" && <div>
                    {this.state.studentPage == false &&
                        <CCClasses teacherID={user.teacherID} SendDataToHomeTeacher={this.getDataFromClasses} />
                    }

                    {this.state.studentPage == true &&
                        <div>

                            <CCStudents class={this.state.class} goToAddNewStudent={this.goToAddNewStudent} goToStudentPage={this.goToStudentPage} />
                        </div>
                    }
                </div>
                }
            </div>
        )
    };
}


/*
<div className="classNameHome col-2"><span className="verticalMiddle">כתה י'2</span></div>
<div className="addStudent col-1"><span className="verticalMiddle">+</span></div>

<div className="childrenNames col-8" >
    <HorizontalScroller>
        <div className="element oddChild"><span className="verticalMiddle">בועז</span></div>
        <div className="element doubleChild"><span className="verticalMiddle">יוני</span></div>
        <div className="element oddChild"><span className="verticalMiddle">אביבית</span></div>
        <div className="element doubleChild"><span className="verticalMiddle">הילה</span></div>
        <div className="element oddChild"><span className="verticalMiddle">עזריאל</span></div>
        <div className="element doubleChild"><span className="verticalMiddle">ורד</span></div>
        <div className="element oddChild"><span className="verticalMiddle">רומי</span></div>
        <div className="element doubleChild"><span className="verticalMiddle">משה</span></div>
        <div className="element oddChild"><span className="verticalMiddle">שלמה</span></div>

    </HorizontalScroller>
</div> */