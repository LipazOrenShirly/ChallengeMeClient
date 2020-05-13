import React, { Component } from 'react';
import ProjectContext from '../../../Context/ProjectContext';
import localHost from '../../LittleComponents/LocalHost';
import CCOneStudent from './CCOneStudent';
import Swal from 'sweetalert2';


export default class CCStudentsSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsArr: [],
            input: ""
        };
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }
    static contextType = ProjectContext;

    componentDidMount() {
        this.setState({ input: this.props.input });

        const user = this.context;
        //משיכת כל הסטודנטים
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("studentsArr= ", result);
                    const studentsArr = result.filter((item) => item.firstName.concat(' ', item.lastName).includes(this.state.input));
                    console.log("studentsArr= ", studentsArr);
                    this.setState({ studentsArr: studentsArr });
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
        const user = this.context;
        return (
            <div className="row col-12">
                {this.state.studentsArr.map((item) =>
                    <CCOneStudent key={item.studentID} student={item} goToStudentPage={this.props.goToStudentPage} />
                )}
            </div>
        );
    }
}