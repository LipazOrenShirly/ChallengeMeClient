import React, { Component } from 'react';
import HorizontalScroller from 'react-horizontal-scroll-container';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCOneStudent from './CCOneStudent';
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';
import localHost from '../../LittleComponents/LocalHost';


export default class CCStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Class: this.props.location.state.Class != null ? this.props.location.state.Class : "",
            StudentArr: []
        };
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount = () => {
        //get by: 
        
        fetch(this.apiUrl+'?classID='+this.state.Class.classID
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
                    console.log("StudentArr= ", result);
                    this.setState({ StudentArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {

        return (
            <div className="container-fluid">
                <NavBar></NavBar><br /><br />
                <SearchBarHomeTeacher />
                <div className="turkiz">
                    {this.state.Class.className}</div>
                {
                    this.state.StudentArr.map((item) =>
                        <CCOneStudent teacherID={this.state.teacherID} student={item} SendDataToClasses={this.getDataFromOneClass} />
                    )}
                <Footer></Footer>
            </div>
        );
    };
}
