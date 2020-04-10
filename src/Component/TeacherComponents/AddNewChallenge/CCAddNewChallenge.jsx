import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAddNewChallenge.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import { TiArrowBack } from 'react-icons/ti';
import ChipsArray from './ChipsArray';
import { IoMdCheckmark } from "react-icons/io";
import FreeSoloTags from './FreeSoloTags';
import FreeSolo from './FreeSolo';
import Swal from 'sweetalert2';
import Checkbox from '@material-ui/core/Checkbox';

import $ from 'jquery';

export default class CCAddNewChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            showTags: false,
            checked: false,
        }

    }
    continueToTags = (e) => {
        e.preventDefault();
        if ($('#NewChallengeName').val() == "") {
            Swal.fire({
                title: 'שים לב',
                text: 'על האתגר אסור להשאר ריק',
                icon: 'warning',
                confirmButtonColor: '#e0819a',
            })
            return;
        }

        let inputNameChallenge = $('#NewChallengeName').val();
        console.log(inputNameChallenge);
        //פקודת גט שבודקת אם האינפוט שהוא בחר נמצא בשרת או לא 
        let returnVal = 0 //נניח ומה שחזר הוא 1
        if (returnVal == 1) {
            Swal.fire({
                title: 'שים לב',
                text: "כבר קיים אתגר כזה במאגר, בלחיצה על אישור תבחר באתגר זה להיות האתגר של הילד",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e0819a',
                cancelButtonColor: '#867D95',
                cancelButtonText: 'בטל',
                confirmButtonText: 'כן, בחר'
            }).then((result) => {
                if (result.value) {
                    //תעבור לדף שאחרי שבוחרים את האתגר מגיעים אליו
                }      //אם בחר בטל
                else {
                    $('#NewChallengeName').val("");
                }
            })
        }
        else {
            this.setState({ showTags: true });
            $('#NewChallengeName').prop('disabled',true);
            $('.bc').css('background-color','rgba(202, 199, 199, 0.07)');
        }

    }
    handleChange = (event) => {
        this.setState(prevState => ({ checked: !prevState.checked }));

    };
    //לא למחוק את זה אולי עוד אעשה תגיותת יפות בהמשך חחח:
    // getNewArrAfterDelete = (data) => {
    //     this.setState({ arr: data })
    // }
    // get=(data)=>{
    //     // let x= $('#NewRelatedTags').val();
    //     let tempArr= this.state.arr;
    //     tempArr.push(data);
    //     this.setState({arr:tempArr})
    //     // $('#NewRelatedTags').val("");
    // }


    render() {



        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">יצירת אתגר חדש</div>
                <br />
                <form >
                    <div className="form-group col-12 bc" dir="rtl">
                        <FreeSolo />
                    </div>
                    {
                    this.state.showTags == false &&
                        <div className="form-group col-12">
                            <button className="btn btn-info createNewChallenge" onClick={this.continueToTags}>המשך</button>
                        </div>
                    }
                    {
                        this.state.showTags == true &&
                        <div>
                            <div className="form-group input-group col-12 bc" dir="rtl">
                                <FreeSoloTags />
                            </div>

                            {/* <ChipsArray TagsArray={this.state.arr} SendNewArrToAddNewChallenge={this.getNewArrAfterDelete} /> */}
                            
                            <div>בחר כמה אחוזים מכל נושא אתה חושב שהאתגר מתאים</div>
                            <div className="col-12" >
                                <input type="number" style={{textAlign:"center"}} class="form-control inputNewTeacher" placeholder="רגשי" min="1" max="100"></input>
                                <input type="number" style={{textAlign:"center"}} class="form-control inputNewTeacher" placeholder="חברתי" min="1" max="100"></input>
                                <input type="number" style={{textAlign:"center"}} class="form-control inputNewTeacher" placeholder="לימודי" min="1" max="100"></input>
                            </div>
                            <div dir="rtl" > 
                                   
                         
                                <Checkbox
                                    checked={this.state.checked}
                                    onChange={this.handleChange}
                                    value="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                               האם לשמור במאגר הגדול או שזה ספיציפי לתלמיד הזה
                            </div>
                            <br />
                            <div className="form-group col-12">
                                <button className="btn btn-info createNewChallenge" onClick={this.createNewChallenge}>יצירת האתגר</button>
                            </div>
                        </div>
                    }
                </form>

                <Footer></Footer>
            </div>
        );
    };
}



