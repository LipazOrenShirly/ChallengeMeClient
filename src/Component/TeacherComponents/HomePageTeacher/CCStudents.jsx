import React, { Component } from 'react';
import HorizontalScroller from 'react-horizontal-scroll-container';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCOneStudent from './CCOneStudent';
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';


export default class CCStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentsNames:[]
        };
    }

    componentDidMount = () => {
        //get by: 
        console.log(this.props.location.state.nameOfClass);
        console.log(this.props.location.state.teacherID);
       
        let arrExample= ["גלעד","אביב","מאיר","דנה","אבי"];
        this.setState({StudentsNames:arrExample});
    }
  
    render() {
       
        return (
            <div className="container-fluid">
                <NavBar></NavBar><br /><br />
                <SearchBarHomeTeacher />
                <div className="turkiz">
                {this.props.location.state.nameOfClass}</div>
                {
          this.state.StudentsNames.map((item) =>
            <CCOneStudent teacherID={this.state.teacherID} Nameofstudent={item} SendDataToClasses={this.getDataFromOneClass}/>
          )}
                <Footer></Footer>
            </div>
        );
    };
}
