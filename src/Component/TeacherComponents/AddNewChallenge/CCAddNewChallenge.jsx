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

import $ from 'jquery';

export default class CCAddNewChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }

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
                <form>
                    <div className="form-group col-12 bc" dir="rtl">
                        <FreeSolo/>
                    </div>
                    <div className="form-group input-group col-12 bc" dir="rtl">
                        <FreeSoloTags/>
                    </div>

                    <ChipsArray TagsArray={this.state.arr} SendNewArrToAddNewChallenge={this.getNewArrAfterDelete} />
                    <div className="form-group col-12">
                        <button className="btn btn-info createNewChallenge" onClick={this.createNewChallenge}>יצירת האתגר</button>
                    </div>
                    חברתי/רגשי/לימודי לפי אחוזים
                    <br />
                    צ'ק בוקס של האם לשמור במאגר הגדול או שזה ספיציפי לתלמיד הזה
                </form>

                <Footer></Footer>
            </div>
        );
    };
}



