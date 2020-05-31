import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleChooseAvatar.css';
import ProjectContext from '../../../Context/ProjectContext';
import localHost from '../../LittleComponents/LocalHost';
import "animate.css";
import { RiLogoutBoxLine } from 'react-icons/ri';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default class CCChooseAvatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageText: 0,
            avatarChosen: ""
        };
        let local = false;
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {

    }


    chooseAvatar = (avatarName) => {
        this.setState({ avatarChosen: avatarName })
        const user = this.context;
        console.log(user.studentID);
        fetch(this.apiUrlStudent + '?studentID=' + user.studentID + '&avatar=' + avatarName
            , {
                method: 'PUT',
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
                    console.log(result);
                    if (result == 1)
                        this.setState({ pageText: 2 })

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

    goToChoose = () => {
        this.setState({ pageText: 1 })
    }

    logout = async () => {
        const user = await this.context;

        var data = await {
            studentID: user.studentID,
            studentToken: ""
        }

        await fetch(this.apiUrlStudent + '/studentToken', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                },
                (error) => {
                    console.log("err post=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });

        await sessionStorage.clear();
        await localStorage.clear();
        await this.props.history.push('/');
    }
    render() {

        return (
            <div className="studentPage">
                <div className="row col-4 logOutDiv" onClick={this.logout} >
                    <RiLogoutBoxLine color='rgb(46, 46, 124)' size={25} style={{ marginRight: '2%' }} /> התנתק
                </div>
                <div className="d-flex align-items-center justify-content-center avatarDIv">
                    {this.state.pageText == 0 &&
                        <div id="pageTextID">
                            <div className="welcomeDivText col-12">!!ברוכים הבאים</div>
                            <div className="textChooseAvatarRules col-12">לפני שתתחילו להתקדם עם האתגרים, ולפרוץ את הגבולות שלכם</div>
                            <div className="textChooseAvatarRules col-12">אנחנו צריכים שתבחרו לכם דמות אווטאר שתגדל ותלווה אתכם במסע שלכם</div>
                            <button className="btn btn-info btnStudent" onClick={this.goToChoose}>התחל</button>

                        </div>
                    }
                    {
                        this.state.pageText == 1 &&
                        <div className="animated slideInRight">
                            <div className="animated slideInRight">
                                <div className="welcomeDivText col-12">בחר את האווטר שילווה אותך</div>
                                <div className="row">
                                    <div className="animated swing slow infinite col-4 avatarClassDiv" > <img src={require('../../../img/avatars/pinguin/pinguin4.png')} onClick={() => this.chooseAvatar('pinguin')} /></div>
                                    <div className="animated swing slow infinite col-4 avatarClassDiv" > <img src={require('../../../img/avatars/chicken/chicken4.png')} onClick={() => this.chooseAvatar('chicken')} /></div>
                                    <div className="animated swing slow infinite col-4 avatarClassDiv" > <img src={require('../../../img/avatars/turtle/turtle4.png')} onClick={() => this.chooseAvatar('turtle')} /></div>

                                </div>

                            </div>
                        </div>
                    }
                    {
                        this.state.pageText == 2 &&
                        <div className="animated slideInRight">
                            <div className="welcomeDivText col-12">האווטר נבחר בהצלחה!</div>
                            <div className="row">
                                <div className="d-flex align-items-center justify-content-center animated tada slow infinite col-12 avatarClassDiv" > <img src={require('../../../img/avatars/' + this.state.avatarChosen + '/' + this.state.avatarChosen + '1.png')} /></div>

                            </div>
                            <button className="btn btn-info btnStudent" onClick={() => this.props.history.push('/StudentHomePage')} >התחל</button>

                        </div>
                    }
                </div>
            </div>
        )
    };

}
