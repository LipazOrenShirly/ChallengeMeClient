import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import { TiArrowBack } from 'react-icons/ti';
import 'react-html5-camera-photo/build/css/index.css';
import localHost from '../../LittleComponents/LocalHost';


export default class CCcamera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageDetails: false,
            dataUriImage:""
        };
        let local = true;
        this.apiUrlStudentChallenge = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrlStudentChallenge = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
        }
    }

    handleTakePhoto = (dataUri) => {
        console.log(dataUri);
        this.setState({dataUriImage:dataUri})
        this.setState({ imageDetails: true })

    }

    saveImage=()=>{
        var data={
            image:this.state.dataUriImage,
            studentID:this.props.location.state.challenge.studentID,
            challengeID:this.props.location.state.challenge.challengeID,
        }
        fetch(this.apiUrlStudentChallenge, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);

                },
                (error) => {
                    console.log("err post=", error);
                })
            .then(


            );


        }
    

    render() {
        return (
            <div>
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                {
                    this.state.imageDetails == false &&
                    <Camera isImageMirror={true} sizeFactor={0.5} onTakePhoto={(dataUri) => { this.handleTakePhoto(dataUri); }} />
                }
                {
                    this.state.imageDetails &&
                    <div>
                    <img className="imageOneChallenge" src={this.state.dataUriImage} />
                    <button className="btn btn-info btnPink col-6" onClick={this.saveImage}>שמור תמונה</button>
                    <button className="btn btn-info btnPink col-6" onClick={()=>this.setState({imageDetails:false})}>צלם תמונה אחרת</button>
                </div>
                }

            </div>
        )
    };
}






