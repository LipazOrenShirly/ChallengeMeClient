import React, { Component } from 'react';
import HorizontalScroller from 'react-horizontal-scroll-container';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCClasses from './CCClasses';
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';
import CCStudents from './CCStudents';
import  ProjectContext  from '../../../Context/ProjectContext';


export default class CCHomePageTeacher extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // teacherID: this.props.location.state != null ? this.props.location.state.teachersFromDB : "" ,//--taking teacherID from the previous page
        };
    }

    componentDidMount = () => {

    }

    getDataFromClasses=(data)=>{
        this.props.history.push({
            pathname:'/StudentsList',
             state:{Class:data}
        })   
    }
   
     static contextType = ProjectContext;                                
   
    render() {
      
         const user = this.context;                  
         console.log("teacherID from context = " + user.teacherID);           
         
        return (
                <div className="container-fluid">
                    <NavBar></NavBar><br /><br />
                    <SearchBarHomeTeacher />
                    <CCClasses teacherID = {user.teacherID} SendDataToHomeTeacher={this.getDataFromClasses} />
                    <Footer></Footer>
                </div>
                ) 
         
    };
}


/*
<div className="classNameHome col-2"><span className="verticalMiddle">כתה י'2</span></div>
<div className="addStudent col-1"><span className="verticalMiddle">+</span></div>

<div className="childrenNames col-8" >
    <HorizontalScroller>
        <div className="element oddChild"><span className="verticalMiddle">בועז</span></div>
        <div className="element doubleChild"><span className="verticalMiddle">יוני</span></div>
        <div className="element oddChild"><span className="verticalMiddle">אביבית</span></div>
        <div className="element doubleChild"><span className="verticalMiddle">הילה</span></div>
        <div className="element oddChild"><span className="verticalMiddle">עזריאל</span></div>
        <div className="element doubleChild"><span className="verticalMiddle">ורד</span></div>
        <div className="element oddChild"><span className="verticalMiddle">רומי</span></div>
        <div className="element doubleChild"><span className="verticalMiddle">משה</span></div>
        <div className="element oddChild"><span className="verticalMiddle">שלמה</span></div>

    </HorizontalScroller>
</div> */