import React, { Component } from 'react';
import localHost from '../../LittleComponents/LocalHost';
import '../../../css/Style.css';
import './styleMessagesStudent.css'
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
            <div>
                {/* מדפיס תאריך */}
                {this.props.dateTitle && <div>{this.props.message.messageDate}</div>}
                
                {/* להודעות נכנסות יהיה עיצוב שונה מאשר להודעות נשלחות */}
                {message.messageByTeacher &&
                    <div className='d-flex justify-content-start' >
                        <div className="incomingMessageDiv">
                            {message.messageText} <p className="pMesLeft">{message.messageTime}</p>
                        </div></div>
                }

                {message.messageByTeacher == false &&
                    <div className='d-flex justify-content-end'>
                        <div className="outgoingMessageDiv">
                            {message.messageText} <p className="pMesRight">{message.messageTime}</p>
                        </div>
                    </div>
                }
            </div>
        );
    };
}



