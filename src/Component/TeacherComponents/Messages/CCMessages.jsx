import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import CCStudentsWithMessage from './CCStudentsWithMessage';
import { TiArrowBack } from 'react-icons/ti';

export default class CCMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
        }
    }

    static contextType = ProjectContext;

    componentDidMount() {
        
    }

    goToChat = (student) => {
        this.props.history.push({
            pathname: '/Chat',
            state: { student: student }
        })
    }

    render() {
        return (
            <div className="container-fluid">

                <NavBar />

                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>

                <CCStudentsWithMessage goToChat={this.goToChat} />

                <Footer />
            </div>
        );
    };
}



