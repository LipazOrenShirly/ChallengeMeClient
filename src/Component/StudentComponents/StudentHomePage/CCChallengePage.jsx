import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import ProjectContext from '../../../Context/ProjectContext';
import localHost from '../../LittleComponents/LocalHost';
import { TiArrowBack } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';
import { AiOutlineExclamation } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import camera from './CCcamera';


import $ from 'jquery';




export default class CCChallengePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            StudentChallenges: [],
            statusSentence:"",
        };
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/StudentChallenge';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/StudentChallenge';
        }
        
    }

    static contextType = ProjectContext;

    componentDidMount() {
        const user = this.context;
        this.btnColor();
    }
    btnColor=()=>{
      var status = this.props.location.state.challenge.status;
      if(status == 1 ){
        $('#success').css('background-color' , '#39E6C6');
        $('#fail').css('background-color' , 'rgb(167, 167, 167)');
        $('#help').css('background-color' , 'rgb(167, 167, 167)');
        this.setState({statusSentence:"האתגר בוצע בהצלחה! כל הכבוד"});
      }else if (status == 2){
        $('#success').css('background-color' , 'rgb(167, 167, 167)');
        $('#fail').css('background-color' , '#FD658B');
        $('#help').css('background-color' , 'rgb(167, 167, 167)');
        this.setState({statusSentence:"לא הצלחת את האתגר, נסה בכל זאת"});
      }else if (status == 3){
        $('#success').css('background-color' , 'rgb(167, 167, 167)');
        $('#fail').css('background-color' , 'rgb(167, 167, 167)');
        $('#help').css('background-color' , '#FFBE3D');
        this.setState({statusSentence:"סימנת שאתה זקוק לעזרה, הודעה נשלחה למחנך והוא ייצור איתך קשר בקרוב"});
        
      }
    }


    updateStatus = (e) => {
        var id=e.currentTarget.id;
        console.log(id);
        const studentChallenge = this.props.location.state.challenge;
        studentChallenge.status = (id == 'success' ? '1' : (id == 'fail' ? '2' : '3'));
        console.log(studentChallenge);

        fetch(this.apiUrl + '?challengeID=' + studentChallenge.challengeID + '&studentID=' + studentChallenge.studentID + '&status=' + studentChallenge.status,
            {
                method: 'PUT',
                // body: JSON.stringify(studentChallenge),
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
                    console.log("PUT= ", result);
                    this.btnColor();
                },
                (error) => {
                    console.log("err get=", error);
                });
    }
    
    AddPhoto=()=>{
        //כאן יהיה ייבוא מהגלריה או מהמצלמה
        this.props.history.push('/camera');
        
    }

    render() {
        const user = this.context;
        const challenge = this.props.location.state.challenge;
        const deadline = new Date(challenge.deadline);
        const today = new Date();
        const dateDiff = parseInt((deadline - today) / (1000 * 60 * 60 * 24), 10);
        console.log(this.props.location.state)
        const dataImg = "dddddddddddddddddddddddddddddd"
        return (
            <div className="container-fluid studentPage">


                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <br/>
                <div className="row"><img className="imageOneChallenge" src={`data:image/jpeg;base64,${dataImg}`} /><FaPencilAlt class="FaPencilAlt" onClick={this.AddPhoto}/></div>

                <div className="challengeReadText" style={{ marginTop: '2%' }}>אתגר מספר {this.props.location.state.index + 1}</div>
                <div className="col-12 challengeReadText challengeName">{challenge.challengeName} </div>
            
                {
                    challenge.status != 0 ? <div className="statusSentence">{this.state.statusSentence}</div> :
                        dateDiff > 30 ?
                            <div> <div className="col-12 dedlineTextChallengePage">מועד סיום האתגר</div>
                                <div className="col-12 dedlineDateTextChallengePage">{challenge.deadline}</div></div>
                            : <div className="col-12 dedlineDateTextChallengePage">נותרו {dateDiff} ימים <br />לסיום האתגר</div>
                }


                <br /><br />

                {/* <div className="col-12 turkiz">סטטוס אתגר: {challenge.status}</div> */}
                <div className="row d-flex justify-content-around" style={{padding:'0px'}}>
                  
                    <div className="col-4" style={{padding:'0px'}}>
                    <div className="col-12">
                    <button className="btn btn-info btnFail Stat2" id='fail' onClick={this.updateStatus} ><MdClose size={50}/></button>
                        </div>
                        <div className="col-12 textSeccesNotOrHelp" >לא הצלחתי</div>
                    </div>
                    <div className="col-4" style={{padding:'0px'}}>
                    <div className="col-12">
                    <button className="btn btn-info btnHelp Stat3" id='help' onClick={this.updateStatus} ><AiOutlineExclamation size={50}/></button>
                        </div>
                        <div className="col-12 textSeccesNotOrHelp" >צריך עזרה</div>
                    </div>
                    <div className="col-4" style={{padding:'0px'}}>
                        <div className="col-12">
                            <button className="btn btn-info btnSuccess Stat1" id='success' onClick={this.updateStatus} ><MdCheck size={50}/></button>
                        </div>
                        <div className="col-12 textSeccesNotOrHelp" >הצלחתי</div>
                    </div>
                    </div>
                </div>


        )
    };
}

