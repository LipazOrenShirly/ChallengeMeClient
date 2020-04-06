import React, { Component } from 'react';

import '../../../css/Style.css';
import './styleAddNewChallenge.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';

import $ from 'jquery';

export default class CCAddNewChallenge extends Component {
    constructor(props) {
        super(props);

    }


    createNewChallenge = () => {

    }
    render() {
        return (
            <div className="container-fluid">
                <NavBar></NavBar>
                <div className="col-12 turkiz">יצירת אתגר חדש</div>
                <br/>
                <form>
                    <div className="form-group col-12">
                        <input type="text" className="form-control inputNewChallenge" id="NewChallengeName" placeholder="שם האתגר" pattern="[א-ת]+" required></input>
                    </div>
                    <div className="form-group col-12">
                        <input type="text" className="form-control inputNewChallenge" id="NewRelatedTags" placeholder="תגיות קשורות" pattern="[א-ת]+" required></input>
                    </div>
    
                    <div className="form-group col-12">
                        <button className="btn btn-info createNewChallenge" onClick={this.createNewChallenge}>יצירת האתגר</button>
                    </div>
                </form>

                <Footer></Footer>
            </div>
        );
    };
}



