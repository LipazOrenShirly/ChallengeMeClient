import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherForgetPassword.css'
import Footer from '../../LittleComponents/Footer';
import Logo from '../../LittleComponents/Logo'
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import SweetAlert from 'sweetalert2-react';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import { TiArrowBack } from 'react-icons/ti';


export default class CCTeacherForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            username: "",
            showGood: false,
            showBad: false,
            HasUserNameValError: true,
            HasmailValError: true
        }

        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';
        }
    }

    Submit = (event) => {
        fetch(this.apiUrl + '?mail=' + this.state.mail + '&username=' + this.state.username,
            {
                method: 'GET',
                // mode: 'no-cors',
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
                    console.log("Submit= ", result);
                    if (result == 1) {
                        this.setState({ showGood: true });
                        this.props.history.push('/TeacherLogin');
                    }
                    else {
                        this.setState({ showBad: true });
                    }

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
        event.preventDefault();
    }

    render() {
        const { mail, username } = this.state;
        return (
            <div className="container-fluid">
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12">
                    <img className="logoImgForget" src={require('../../../img/logoChallengeMe.svg')} />
                </div>

                <div className="col-10 ForgetPasswordDiv" align="right">
                    <div><strong>?שכחת ססמה</strong></div>
                    <div className="marginBottom">לא נורא, הזן את כתובת המייל איתה נרשמת ונשלח לך סיסמה חדשה</div>

                    <form onSubmit={this.Submit}>
                        <div className="form-group">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    id: 'NewTMail',
                                    type: 'mail',
                                    placeholder: 'כתובת מייל',
                                    className: "form-control col-12 inputRounded"
                                }}

                                value={mail}
                                validationCallback={res =>
                                    this.setState({ HasmailValError: res, validate: false })
                                }
                                onChange={(mail, e) => { //כל שינוי הוא שומר בסטייט
                                    this.setState({ mail });
                                    console.log(e);
                                }}
                                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                                validationOption={{
                                    check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                    required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                                    customFunc: mail => {
                                        const reg1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        if (reg1.test(String(mail).toLowerCase())) {
                                            return true;
                                        } else {
                                            this.setState({ HasmailValError: true });
                                            return "נא לכתוב כתובת מייל";
                                        }
                                    }
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                                attributesInput={{
                                    id: 'unameId',
                                    type: 'text',
                                    placeholder: 'הכנס שם משתמש',
                                    className: "form-control col-12 inputRounded"
                                }}

                                value={username}
                                validationCallback={res =>
                                    this.setState({ HasUserNameValError: res, validate: false })
                                }
                                onChange={(username, e) => { //כל שינוי הוא שומר בסטייט
                                    this.setState({ username });
                                    console.log(e);
                                }}
                                onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                                validationOption={{
                                    check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                    required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                                    msgOnError: "נא לכתוב שם משתמש",
                                }}
                            />
                        </div>

                        <div className="text-center"><button disabled={this.state.HasUserNameValError || this.state.HasmailValError} type="submit" className="btn btn-light btnPink roundedBtn">שלח</button></div>

                        <SweetAlert
                            show={this.state.showGood}
                            title="הסיסמה שונתה!"
                            text="הססמה החדשה נשלחה לך למייל"
                            icon="success"
                            onConfirm={() => this.setState({ showGood: false })}
                        />
                        <SweetAlert
                            show={this.state.showBad}
                            title="אוי"
                            text="המייל לא נשלח, אנא נסה שנית"
                            icon="error"
                            onConfirm={() => this.setState({ showBad: false })}
                        />
                    </form>
                </div>
                <div className="divForgetPasswordIMG"><img className="ForgetPasswordIMG" src={require('../../../img/forgetPasswordImg.png')} />
                </div>
                <Footer />
            </div>
        );
    };
}