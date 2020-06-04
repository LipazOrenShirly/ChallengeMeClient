import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudenTtransfer.css';
import NavBar from '../../LittleComponents/NavBar';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import { TiArrowBack } from 'react-icons/ti';
import FreeSoloCategoriesStudents from './FreeSoloCategoriesStudents';
import FreeSoloTeacher from './FreeSoloTeacher';
import $ from 'jquery';


class CCStudentTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsArr: [],
        }
        let local = false;
        this.apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
        this.apiUrlTeacher = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';

        if (!local) {
            this.apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
            this.apiUrlTeacher = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';

        }
    }

    componentDidMount() {
        this.getStudents();
        this.getTeachers();
    }
    getStudents = () => {
        const user = this.context;
        fetch(this.apiUrlStudent + '?teacherID=' + user.teacherID
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
                    console.log(result);
                    this.setState({ studentsArr: result })
                },
                (error) => {
                    console.log("err get=", error);
                    Swal.fire({
                        title: 'אוי',
                        text: 'הפעולה נכשלה, נסה שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                })

    }


    onInputChange = (event, value) => {
        // if (value == "") {         //אם אין אינפוט אז ירוקן את הסטייט
        //     this.setState({ filteredChallengesByName: [] });
        //     return;
        // }
        // console.log(value);
        // var temp = this.state.challengesArr.filter((item) => item.challengeName.includes(value));
        // console.log(temp);
        // this.setState({ filteredChallengesByName: temp });
    }

    getTeachers = () => {

    }

    render() {
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">שיוך תלמיד למורה אחר מאותו מוסד לימודי</div>
                <br />
                <form onSubmit={this.Submit}>
                    <div className="form-group col-12 bc" dir="rtl">
                        <FreeSoloCategoriesStudents lableFreeSolo="שם התלמיד להעברה" challenges={this.state.studentsArr} onInputChange={this.onInputChange} />
                    </div>
                    <div>
                        <div className="form-group input-group col-12 bc" dir="rtl">
                            <FreeSoloTeacher lableFreeSolo="שם המורה אליו יועבר התלמיד" tags={this.state.tagsArr} onTagsChange={this.onTagsChange} />
                        </div>

                    </div>
                </form>

            </div>
        );
    }
}

export default CCStudentTransfer;