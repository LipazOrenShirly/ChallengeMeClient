import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import './styleStudentPage.css'

class CCStudentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {}
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod'+'/api/Student';
        }
     
    }

    componentDidMount = () => { //כרגע לא משתמשים בזה, האוביקט בא שלם ממסך הבית
        fetch(this.apiUrl + '?studentID='+this.props.student.studentID
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
        const student = this.props.student;
        return ( 
            <div>
                <p className="textStudentDetails">פרטי התלמיד <strong>{student.firstName} {student.lastName}</strong></p>
            </div>
         );
    }
}

export default CCStudentDetails;