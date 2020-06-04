import Resizer from 'react-image-file-resizer';
import React, { Component } from 'react';
// import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import { TiArrowBack } from 'react-icons/ti';
import 'react-html5-camera-photo/build/css/index.css';
import localHost from '../../LittleComponents/LocalHost';
// import FileBase64 from 'react-file-base64';
import Swal from 'sweetalert2';


export default class CCcamera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageDetails: false,
            dataUriImage: "",
            file: null
        };
        let local = false;
        this.apiUrlStudentChallenge = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrlStudentChallenge = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
        }
        this.getFiles = this.getFiles.bind(this);

    }

    handleTakePhoto = (dataUri) => {
        // dataUri --> base64
        this.setState({ dataUriImage: dataUri })
        this.setState({ imageDetails: true })
    }
    getFiles(e) {
        // alert(files.base64);
        // console.log(files);
        var fileInput = false;
        if (e.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {

            Resizer.imageFileResizer(
                e.target.files[0], //is the file of the new image that can now be uploaded...
                500, // is the maxWidth of the  new image
                300, // is the maxHeight of the  new image
                'PNG', // is the compressFormat of the  new image
                60, // is the quality of the  new image
                0, // is the rotatoion of the  new image
                uri => { this.setState({ dataUriImage: uri }) },  // is the callBack function of the new image URI
                'base64'  // is the output type of the new image
            );
        }
        // 
        // console.log(this.state.dataUriImage)
        this.setState({ imageDetails: true })
    }

    saveImage = () => {
        var data = {
            image: this.state.dataUriImage,
            studentID: this.props.location.state.challenge.studentID,
            challengeID: this.props.location.state.challenge.challengeID,
        }
        fetch(this.apiUrlStudentChallenge + "/AddImg"
            , {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8'
                })
            })
            .then(res => {
                console.log('res=', res);
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                    window.history.back()
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'אוי',
                        text: 'התמונה לא נשמרה, נסה שוב',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    render() {
        return (
            <div className="studentPage">
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                { // לפני שמצלמים כאשר עדיין אין תמונה
                    this.state.imageDetails == false &&

                    <div className="col-12" style={{ padding: '0px' }}>

                        {/* <Camera isImageMirror={true} sizeFactor={0.5} onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)} /> */}
                        <p className="cameraP">בחר תמונה לעלות לאתגר זה</p>
                        <div>
                            <input type="file" onChange={this.getFiles} />
                        </div>
                        {/* <FileBase64
                            multiple={false}
                            onDone={this.getFiles.bind(this)} /> */}
                    </div>
                }
                { // אחרי שמצלמים
                    this.state.imageDetails &&
                    <div className="imageTaken">
                        <div className="col-12" style={{ backgroundColor: 'black' }}>
                            <img className="imageOneChallenge" src={this.state.dataUriImage} />
                        </div>
                        <button className="btn btn-info btnPink col-6" style={{ height: '70px' }} onClick={this.saveImage}>שמור תמונה</button>
                        <button className="btn btn-info btnPink col-6" style={{ height: '70px' }} onClick={() => this.setState({ imageDetails: false })}>צלם תמונה אחרת</button>
                    </div>

                }
            </div>
        )
    };
}






