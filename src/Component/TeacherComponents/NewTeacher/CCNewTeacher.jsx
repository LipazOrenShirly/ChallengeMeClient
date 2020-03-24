import React, { Component } from 'react';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import '../../../css/Style.css';
import './styleNewTeacher.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'
import localHost from '../../LittleComponents/LocalHost';

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
            password2: "",
            school: "",
            HasfirstNameValError:true,
            HaslastNameValError:true,
            HasuserNameValError:true,
            HasMailValError:true,
            HasPhoneValError:true,
            HasPasswordValError:true,
            HasPassword2ValError:true,
            HasSchoolValError:true,

        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    Submit = (event) => {
        // console.log('state=' + this.state);

        // var data = {
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     userName: this.state.userName,
        //     mail: this.state.mail,
        //     phone: this.state.phone,
        //     password: this.state.password,
        //     school: this.state.school
        // }
        // console.log('data=' + data);
        // fetch(this.apiUrl, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: new Headers({
        //         'Content-type': 'application/json; charset=UTF-8'
        //     })
        // })
        //     .then(res => {
        //         console.log('res=', res);
        //         return res.json()
        //     })
        //     .then(
        //         (result) => {
        //             console.log("fetch POST= ", result);
                    
        //         },
        //         (error) => {
        //             console.log("err post=", error);
        //         })
        //     .then(
        //         this.props.history.push({
        //             pathname: '/TeacherLogin',
        //         })
        //     );

        // event.preventDefault();
    }

    render() {
        const {
            firstName,
            lastName,
            userName,
            mail,
            phone,
            password,
            password2,
            school,
          } = this.state;
       
        return (
            <div className="container-fluid">
                <div className="loginDiv">
                    <Logo></Logo>
                    <form onSubmit={this.Submit}>
                        <div className="form-group col-12">
                        <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                attributesInput={{
                  id: 'NewTFirstName',
                  type: 'text',
                  placeholder: 'שם פרטי',
                  className: "form-control inputNewTeacher"
                }}
               
                value={firstName}
                validationCallback={res =>
                  this.setState({ HasfirstNameValError: res, validate: false })
                }
                onChange={(firstName, e) => { //כל שינוי הוא שומר בסטייט
                  this.setState({ firstName });
                  console.log(e);
                }}
                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                validationOption={{
                  check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                  required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                  customFunc: async v => {
                    if (v === "") {
                      this.setState({ hasError: true });
                      return "Name is required.";
                    }
                    if (v.length < 4) {
                      this.setState({ hasError: true });
                      return "Name needs at least 4 length.";
                    }}
                }}
              />
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