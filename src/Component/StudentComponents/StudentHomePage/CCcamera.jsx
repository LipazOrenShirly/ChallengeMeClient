import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import { TiArrowBack } from 'react-icons/ti';
import 'react-html5-camera-photo/build/css/index.css';


export default class CCcamera extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleTakePhoto = (dataUri) => {
        console.log(dataUri);
    }

    render() {
        return (
            <div>
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <Camera isImageMirror = {true} sizeFactor={0.5} onTakePhoto={(dataUri) => { this.handleTakePhoto(dataUri); }} />
                {/* isImageMirror אפשר לעשות איקון שמחליף למצלמה אחורית */}
            </div>
        )
    };
}





