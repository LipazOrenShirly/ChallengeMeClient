import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';

export default class OneMessage extends Component {
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

    render() {
    const message = this.props.message;
        return (
            <div className="container-fluid">
                {/* להודעות נכנסות יהיה עיצוב שונה מאשר להודעות נשלחות */}
                {message.messageByTeacher &&
                    <div className = 'incomingMessage'>{message.messageText}</div>
                    // להציג תאריך ושעה לכל הודעה
                }

                {message.messageByTeacher == false &&
                    <div className = 'outgoingMessage'>{message.messageText}</div>
                    // להציג תאריך ושעה לכל הודעה
                }
            </div>
        );
    };
}



