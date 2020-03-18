import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import CCOneClass from './CCOneClass';



export default class CCClasses extends Component {
    constructor(props) {
        super(props);
       this.state={
            teacherID:  this.props.teacherID,
            classesNames:[],
       }
    }
    componentWillMount(){
        //get classes
        console.log(this.props.teacherID) //teacherID
        let arrExample= ["י'2","יב'3","יא'4"];
        this.setState({classesNames:arrExample});
    }
    getDataFromOneClass=(data)=>{
        this.props.SendDataToHomeTeacher(data);
    }

    render() {
        return (

            <div className="classes">
            <div className="myClasses">הכיתות שלי</div>
            <div className="row col-12">

            {
          this.state.classesNames.map((item) =>
            <CCOneClass teacherID={this.state.teacherID} Nameofclass={item} SendDataToClasses={this.getDataFromOneClass}/>
          )}
               


            </div>
            <div className="AddnewClass">הוספת כיתה +</div>
            </div>        );
    };
}















