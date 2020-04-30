import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessages.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import $ from 'jquery';
import ProjectContext from '../../../Context/ProjectContext';

export default class CCOneMessage extends Component {
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
        var date = this.props.message.messageDate;
        var currDate = new Date();
        currDate = currDate.getHours() + ":" + currDate.getMinutes();
        var today = 'היום';
        return (

            <div>
                {/* מדפיס תאריך */}
                {this.props.dateTitle && <div> {date == currDate ? today : date}</div>}
                
                {/* להודעות נכנסות יהיה עיצוב שונה מאשר להודעות נשלחות */}
                {message.messageByTeacher == false &&
                    <div className='d-flex justify-content-start' >
                        <div className="incomingMessageDivT"><p className="pMesLeft">{message.messageTime}</p>
                            {message.messageText}
                        </div>
                    </div>
                    // להציג תאריך ושעה לכל הודעה
                }

                {message.messageByTeacher &&
                    <div className='d-flex justify-content-end'>
                        <div className="outgoingMessageDivT">
                            {message.messageText} <p className="pMesRight">{message.messageTime}</p>
                        </div>
                    </div>
                    // להציג תאריך ושעה לכל הודעה
                }
            </div>
        );
    };
}



