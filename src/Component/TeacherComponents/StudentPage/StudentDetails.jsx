import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';

class StudentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {}
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount = () => {
        fetch(this.apiUrl + '?studentID='+this.props.studentID
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
                    console.log("Student Data= ", result[0]);
                    this.setState({ student: result[0] });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {
        const student = this.state.student;
        return ( 
            <div>
                Student Details:
                {student.firstName}
                {student.lastName}
            </div>
         );
    }
}

export default StudentDetails;