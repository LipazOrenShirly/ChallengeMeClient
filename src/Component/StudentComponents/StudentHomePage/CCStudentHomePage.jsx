import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import ProjectContext from '../../../Context/ProjectContext';
import CCStudentChallenges from './CCStudentChallenges';
import { MdMail } from "react-icons/md";
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import localHost from '../../LittleComponents/LocalHost';

export default class CCStudentHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countMessages: null,
        };
        let local = true;
        this.apiUrlMessage = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        if (!local) {
            this.apiUrlMessage = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
        }
    }

    static contextType = ProjectContext;

    goToChallengePage = (challenge) => {
        this.props.history.push({
            pathname: '/ChallengePage',
            state: { challenge: challenge }
        })
    }

    componentDidMount = () => {
        this.getDataOfMessagesNum();
        setInterval(this.getDataOfMessagesNum, 30000); // runs every 30 seconds.
    }

    getDataOfMessagesNum = () => {// runs every 30 seconds  משיכה של מספר ההודעה שלא נקראו

        const user = this.context;
        fetch(this.apiUrlMessage + '?studentID_UnRead='+ user.studentID
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
                console.log("countMessages= ", result);
                this.setState({countMessages: result});
            },
            (error) => {
                console.log("err get=", error);
            });
    }

    render() {
        const user = this.context;

        return (
            <div className="container-fluid">
                <NavBar></NavBar><br /><br />
                
                <div className="col-3 massegesTeacherHomePage">
                    <Link to="/StudentMessages" className="linkColor">
                        <Badge badgeContent={this.state.countMessages} color="secondary">
                            <MdMail size={40} />
                        </Badge>
                    </Link>
                </div>

                <CCStudentChallenges goToChallengePage={this.goToChallengePage} />

                <Footer></Footer>
            </div>
        )
    };
}

