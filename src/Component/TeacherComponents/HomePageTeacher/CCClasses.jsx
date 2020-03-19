import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import CCOneClass from './CCOneClass';
import localHost from '../../LittleComponents/LocalHost';

export default class CCClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherID: this.props.teacherID,
            classesArr: []
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }
    componentWillMount() {
        //get classes
        console.log(this.props.teacherID) //teacherID

        fetch(this.apiUrl+'?teacherID='+this.state.teacherID
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
                    console.log("classesArr= ", result);
                    this.setState({ classesArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    getDataFromOneClass = (data) => {
        this.props.SendDataToHomeTeacher(data);
    }

    render() {
        return (

            <div className="classes">
                <div className="myClasses">הכיתות שלי</div>
                <div className="row col-12">
                    {
                        this.state.classesArr.map((item) =>
                            <CCOneClass teacherID={this.state.teacherID} class={item} SendDataToClasses={this.getDataFromOneClass} />
                        )}
                </div>
                <div className="AddnewClass">הוספת כיתה +</div>
            </div>
        );
    };
}















