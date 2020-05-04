import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import { TiArrowBack } from 'react-icons/ti';
import 'react-html5-camera-photo/build/css/index.css';
import localHost from '../../LittleComponents/LocalHost';

export default class CCSelectAvatar extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        let local = true;
        this.apiUrlStudentChallenge = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrlStudentChallenge = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    };
}






