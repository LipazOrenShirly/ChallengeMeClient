import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleNewTeacher.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'
import localHost from '../../LittleComponents/LocalHost';
import Popup from 'react-popup';

export default class CCnewTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            mail: "",
            phone: "",
            password: "",
            school: ""
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    Submit = (event) => {
        console.log('state=' + this.state);

        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            mail: this.state.mail,
            phone: this.state.phone,
            password: this.state.password,
            school: this.state.school
        }
        console.log('data=' + data);
        fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                    
                },
                (error) => {
                    console.log("err post=", error);
                })
            .then(
                this.props.history.push({
                    pathname: '/TeacherLogin',
                })
            );

        event.preventDefault();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="loginDiv">
                    <Logo></Logo>
                    <form onSubmit={this.Submit}>
                        <div className="form-group col-12">
                            <input type="text" className="form-control inputNewTeacher" id="NewTFirstName" placeholder="שם פרטי" pattern="[א-ת]+" required
                                onChange={(e) => this.setState({ firstName: e.target.value })} />
                        </div>
                        <div className="form-group col-12">
                            <input type="text" className="form-control inputNewTeacher" id="NewTLastName" placeholder="שם משפחה" pattern="[א-ת]+" required
                                onChange={(e) => this.setState({ lastName: e.target.value })} />
                        </div>
                        <div className="form-group col-12">
                            <input type="text" className="form-control inputNewTeacher" id="NewTUserName" placeholder="שם משתמש" required
                                onChange={(e) => this.setState({ userName: e.target.value })} />
                        </div>
                        <div className="form-group col-12">
                            <input type="mail" className="form-control inputNewTeacher" id="NewTMail" placeholder="כתובת מייל" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required
                                onChange={(e) => this.setState({ mail: e.target.value })} />
                        </div>
                        <div className="form-group col-12">
                            <input type="phone" className="form-control inputNewTeacher" id="NewTPhone" placeholder="פלאפון" pattern="[0][5][0-9]{8}$" required
                                onChange={(e) => this.setState({ phone: e.target.value })} />
                        </div>
                        <div className="form-group col-12">
                            <input type="password" className="form-control inputNewTeacher" id="NewTPassword" placeholder="הזן ססמה" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                                onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                        {/* Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters   */}
                        <div className="form-group col-12">
                            <input type="password" className="form-control inputNewTeacher" id="NewTPassword2" placeholder="הזן ססמה בשנית" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required></input>
                        </div>
                        <div className="form-group col-12">
                            <input type="text" className="form-control inputNewTeacher" id="NewTSchool" placeholder="מוסד לימודים שהינך מלמד בו" required
                                onChange={(e) => this.setState({ school: e.target.value })} />
                        </div>
                        <div className="col-12">
                            <button type="submit" id="submit" className="btn btn-info btnYellow">כניסה</button>
                        </div>
                    </form>
                </div>
                <Footer></Footer>



            </div>

        );
    };
}