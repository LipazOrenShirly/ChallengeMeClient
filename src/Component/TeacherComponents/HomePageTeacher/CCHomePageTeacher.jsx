import React, { Component } from 'react';
import HorizontalScroller from 'react-horizontal-scroll-container';
import '../../../css/Style.css';
import './styleHomePageTeacher.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import CCClasses from './CCClasses';
import SearchBarHomeTeacher from '../../LittleComponents/SearchBarHomeTeacher';
import CCStudents from './CCStudents';
import ProjectContext from '../../../Context/ProjectContext';
import { TiArrowBack } from 'react-icons/ti';



export default class CCHomePageTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            class: {},
            studentPage: false,
        };
    }
    static contextType = ProjectContext;

    componentDidMount = () => {
        this.getDataOfMessagesNum();
        setInterval(this.getDataOfMessagesNum, 30000); // runs every 30 seconds.
    }
    getDataOfMessagesNum = () => {// runs every 30 seconds.
        //כאן צריך לעשות משיכה של מספר ההודעות וההתרעות שיש למורה הספיציפי הזה

    }


    getDataFromClasses = (data) => {
        this.setState({ class: data });
        this.setState({ studentPage: true })
    }

    getDataFromStudents = (data) => {
        this.props.history.push({
            pathname: '/StudentPage',
            state: { student: data }
        })
    }
    getFronStudents = (classID) => {
        this.props.history.push({
            pathname: '/AddNewStudent',
            state: { classID: classID }
        })
    }
  
    render() {

        const user = this.context;
        console.log("teacherID from context = " + user.teacherID);

        return (
            <div className="container-fluid">
                <NavBar></NavBar><br /><br />
                <SearchBarHomeTeacher countMessages={4} countAlerts={144} />

                {this.state.studentPage == false &&
                    <CCClasses teacherID={user.teacherID} SendDataToHomeTeacher={this.getDataFromClasses} />

                }
                {this.state.studentPage == true &&
                    <div>
                        <div className="col-12"> {/* חזור למסך הקודם */}
                            <TiArrowBack className="iconArrowBack" onClick={() => this.setState({ studentPage: false })} size={40} />
                        </div>
                        <CCStudents class={this.state.class} SendtoStudents={this.getFronStudents} SendDataToHomeTeacher2={this.getDataFromStudents}  />
                    </div>
                }
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