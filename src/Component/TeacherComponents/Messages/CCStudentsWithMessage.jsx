import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import CCOneStudentsWithMessage from './CCOneStudentsWithMessage';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';

export default class CCStudentsWithMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentIDArr: [],
            Students: [],
            studentsWithNoChat: [],
            searchInput: "",
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
            this.apiUrlStudent = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
        fetch(this.apiUrl + '?teacherID=' + user.teacherID
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
                    console.log("studentsArr= ", result);
                    this.setState({ studentIDArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                });

        fetch(this.apiUrlStudent + '?teacherID=' + user.teacherID
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
                    console.log("Students= ", result);
                    this.setState({ Students: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    searchStudents = (searchInput, e) => {
        this.setState({ searchInput });
        console.log(this.state.searchInput);
        console.log(this.state.studentIDArr);

        if (searchInput == "") {  //אם מוחקים הכל מהשדה אז הרשימה תתרוקן
            this.setState({ studentsWithNoChat: [] });
        }
        else {   // אם השדה לא ריק אז מוצאים תלמידים מתאימים לחיפוש
            // סינון התלמידים שכבר יש איתם שיחות מתוך כל התלמידים של המורה
            const studentsWithNoChat = this.state.Students.filter((item) =>
                item.firstName.concat(' ', item.lastName).includes(searchInput) && !this.state.studentIDArr.includes(item.studentID)
            );
            this.setState({ studentsWithNoChat: studentsWithNoChat }); // שמירת התלמידים המסוננים בסטייט
            console.log(this.state.studentsWithNoChat);
        }
    }

    render() {
        const searchInput = this.state.searchInput;
        return (
            <div className="container-fluid">

                {/* שדה חיפוש תלמיד לפי שם */}
                <div className="form-group col-12">
                    <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                        attributesInput={{
                            id: 'searchInput',
                            type: 'text',
                            placeholder: 'חפש תלמיד',
                            className: "form-control inputNewTeacher"
                        }}
                        value={searchInput}
                        onChange={(searchInput, e) => this.searchStudents(searchInput, e)}
                    />
                </div>

                <div className="col-12 turkiz">שיחות קיימות</div>
                {/* תלמידים שלמורה כבר יש שיחה איתם        */}
                <div>
                    {this.state.studentIDArr.map((item) =>
                        <OneStudentsWithMessage studentID={item} key={item} goToChat={this.props.goToChat} />
                    )}
                </div>
                <br />

                {/* מציג תלמידים מהשדה חיפוש (תלמידים שאין איתם שיחה עדיין */}
                <div className="col-12 turkiz">תוצאת חיפוש תלמיד</div>
                {this.state.studentsWithNoChat.map((item) =>
                    <div onClick={ () => this.props.goToChat(item) }>{item.firstName} {item.lastName}</div>)}
            </div>
        );
    };
}



