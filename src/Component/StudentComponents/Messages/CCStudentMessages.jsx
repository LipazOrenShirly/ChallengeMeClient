import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';
import { TiArrowBack } from 'react-icons/ti';

export default class CCStudentMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Message';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/Message';
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

                <NavBar></NavBar>

                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>

                <StudentsWithMessage goToChat={this.goToChat} />

                <Footer></Footer>
            </div>
        );
    };
}



