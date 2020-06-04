import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import CCOneClass from './CCOneClass';
import localHost from '../../LittleComponents/LocalHost';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import Swal from 'sweetalert2';


export default class CCClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherID: null,
            classesArr: [],
            showAddClass: false,
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Class';
        }
    }

    static contextType = ProjectContext;

    async componentDidMount() {
        // console.log(this.props.teacherID)
        const user = await this.context;
        await console.log("teacherID from context = " + user.teacherID);
        await this.setState({ teacherID: user.teacherID });
        await this.GetClassesNames();
    }

    GetClassesNames = () => {
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("classesArr= ", result);
                    this.setState({ classesArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'לא ניתן לראות את רשימת הכיתות, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    getDataFromOneClass = (data) => {
        this.props.SendDataToHomeTeacher(data);
    }
    getClassNameFromOneClass = (data) => {
        this.DeleteClass(data);
    }
    DeleteClass = (classIdData) => {
        fetch(this.apiUrl + '?classID=' + classIdData, {
            method: 'DELETE',
            headers: new Headers({
                'accept': 'application/json; charset=UTF-8'
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
                    console.log("fetch DELETE= ", result);
                    this.GetClassesNames();
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'הכיתה לא נמחקה, אנה נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });

    }
    AddClass = () => {
        this.setState(
            prevState => ({ //אם אמת תהפוך לשקר וההפך
                showAddClass: !prevState.showAddClass
            }));
    }

    Submit = (event) => {
        const user = this.context;

        event.preventDefault();
        var data = {
            className: $('#newClass').val(),
            teacherID: user.teacherID
        }
        fetch(this.apiUrl, {
            method: 'POST',
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
                    this.GetClassesNames()

                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'הכיתה לא התווספה, אנא נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })
            .then(
                this.setState({ showAddClass: false })

            );


    }

    render() {
        return (
            <div className="classes">
                <div className="myClasses">הכיתות שלי</div>
                <div className="col-12 justify-content-center">
                    <div className="row mp0 flex-container containerClasses">
                        {this.state.classesArr.map((item) =>
                            <CCOneClass key={item.classID} class={item} SendClassNameToClasses={this.getClassNameFromOneClass} SendDataToClasses={this.getDataFromOneClass} />
                        )}
                    </div>
                </div>
                <div className="AddnewClass" id="AddnewClass" onClick={this.AddClass}>הוספת כיתה +</div>

                {this.state.showAddClass == true &&
                    <form onSubmit={this.Submit} display='none'>
                        <div className="form-group col-12">
                            <input type="text" id="newClass" className="form-control inputRounded" placeholder="כתוב שם כיתה" required />
                        </div>
                        <div className="col-12">
                            <button type="submit" id="submit" className="btn btn-info btnPink roundedBtn">הוסף כיתה</button>
                        </div>
                        <br/>
                    </form>
                }

            </div>
        );
    };
}















