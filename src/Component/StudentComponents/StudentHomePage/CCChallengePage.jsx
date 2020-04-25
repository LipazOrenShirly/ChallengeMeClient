import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import ProjectContext from '../../../Context/ProjectContext';
import localHost from '../../LittleComponents/LocalHost';
import { TiArrowBack } from 'react-icons/ti';

export default class CCChallengePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            StudentChallenges: [],
        };
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
    }

    updateStatus = (id) => {
        console.log(id);
        const studentChallenge = this.props.location.state.challenge;
        studentChallenge.status = (id == 'success' ? '1' : (id == 'fail' ? '2' : '3'));
        console.log(studentChallenge);

        fetch(this.apiUrl +'?challengeID='+studentChallenge.challengeID+'&studentID='+studentChallenge.studentID+'&status='+studentChallenge.status,
            {
                method: 'PUT',
                // body: JSON.stringify(studentChallenge),
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
                    console.log("PUT= ", result);
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {
        const user = this.context;
        const challenge = this.props.location.state.challenge;
        const deadline = new Date(challenge.deadline);
        const today = new Date();
        const dateDiff = parseInt((deadline-today) / (1000 * 60 * 60 * 24), 10);

        return (
            <div className="container-fluid">

                <NavBar></NavBar><br /><br />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>

                <div className="col-12 turkiz">האתגר: {challenge.challengeName} </div>
                <div className="col-12 turkiz">תאריך סיום: {challenge.deadline}  </div>
                <div className="col-12 turkiz">או ספירת ימים עד תאריך הסיום: {dateDiff} </div>

                <div className="col-12 turkiz">{challenge.status}</div>
                <div className="col-12 turkiz">תמונה של האתגר</div>
                <div className="col-12 turkiz">להוסיף בחירת תמונה ובחירת רקע?</div>
                <br /><br />

                <div className="col-12 turkiz">סטטוס אתגר: {challenge.status}</div>
                <button id='success' onClick={ (e) => this.updateStatus(e.target.id) } >הצלחתי</button>
                <button id='fail' onClick={ (e) => this.updateStatus(e.target.id) } >לא מצליח</button>
                <button id='help' onClick={ (e) => this.updateStatus(e.target.id) } >צריך עזרה</button>

                <Footer></Footer>

            </div>
        )
    };
}

