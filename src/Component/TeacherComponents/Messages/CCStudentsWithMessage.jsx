import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import ProjectContext from '../../../Context/ProjectContext';
import CCOneStudentsWithMessage from './CCOneStudentsWithMessage';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import Swal from 'sweetalert2';


export default class CCStudentsWithMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsWithChat: [],
            Students: [],
            studentsWithNoChat: [],
            searchInput: "",
            searchStudentsWithChat: [],
            searchStudentsWithNoChat: []
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
        // מושך רשימה של כל התלמידים שיש למורה שיחה איתם ואת כמות ההודעות שלא נקראו ומסדר לפי הכי חדש
        await fetch(this.apiUrl + '?teacherID=' + user.teacherID
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
                    console.log("studentsWithChat= ", result);
                    this.setState({ studentsWithChat: result })
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'אנא טען את העמוד מחדש',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });

        // מחזיר את כל התלמידים של המורה
        await fetch(this.apiUrlStudent + '?teacherID=' + user.teacherID
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
                    console.log("Students= ", result);
                    this.setState({ Students: result });
                    const studentsWithNoChat = this.state.Students.filter((item) =>
                        !this.state.studentsWithChat.includes(item.studentID)
                    );
                    this.setState({ studentsWithNoChat: studentsWithNoChat }); // שמירת התלמידים המסוננים בסטייט
                    console.log(this.state.studentsWithNoChat);
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    searchStudents = (searchInput, e) => {
        this.setState({ searchInput });
        console.log(searchInput);

        // תלמידים שיש להם צ'ט
        const searchStudentsWithChat = this.state.Students.filter((item) =>
            item.firstName.concat(' ', item.lastName).includes(searchInput) && this.state.studentsWithChat.includes(item.studentID)
        );
        this.setState({ searchStudentsWithChat });
        console.log(this.state.searchStudentsWithChat);

        // תלמידים שאין להם צ'ט
        const searchStudentsWithNoChat = this.state.Students.filter((item) =>
            item.firstName.concat(' ', item.lastName).includes(searchInput) && !this.state.studentsWithChat.includes(item.studentID)
        );
        this.setState({ searchStudentsWithNoChat });
        console.log(this.state.searchStudentsWithNoChat);
    }


    render() {
        const searchInput = this.state.searchInput;
        return (
            <div className="container-fluid">

                {/* שדה חיפוש תלמיד לפי שם */}
                <div className="form-group col-12" dir="rtl">
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

                {/* תלמידים שלמורה כבר יש שיחה איתם מסודרים לפי הכי חדש */}
                {this.state.searchInput == "" &&
                    <div>
                        {this.state.studentsWithChat.map((item) =>
                            <CCOneStudentsWithMessage studentID={item} key={item} goToChat={this.props.goToChat} />
                        )}
                    </div>
                }
                {/* תלמידים שלמורה אין שיחה איתם */}
                {this.state.searchInput == "" &&
                    <div>
                        {this.state.studentsWithNoChat.map((item) =>
                            <CCOneStudentsWithMessage studentID={item.studentID} key={item.studentID} goToChat={this.props.goToChat} />
                        )}
                    </div>
                }

                {/* תוצאות מהחיפוש - מציג תלמידים שיש להם צ'ט */}
                {this.state.searchInput != "" &&
                    <div>
                        {this.state.searchStudentsWithChat.map((item) =>
                            <CCOneStudentsWithMessage studentID={item.studentID} key={item.studentID} goToChat={this.props.goToChat} />
                        )}
                    </div>
                }
                {/* תוצאות מהחיפוש - מציג תלמידים שאין להם צ'ט */}
                {this.state.searchInput != "" &&
                    <div>
                        {this.state.searchStudentsWithNoChat.map((item) =>
                            <CCOneStudentsWithMessage studentID={item.studentID} key={item.studentID} goToChat={this.props.goToChat} />
                        )}
                    </div>
                }
            </div>
        );
    };
}



