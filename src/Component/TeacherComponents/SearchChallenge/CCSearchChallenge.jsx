import React, { Component } from 'react';
import '../../../css/Style.css';
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import { TiArrowBack } from 'react-icons/ti';
import FreeSoloTags from '../AddNewChallenge/FreeSoloTags';
import FreeSolo from '../AddNewChallenge/FreeSolo';
import $ from 'jquery';
import { IoIosReturnLeft } from 'react-icons/io';
import CCOneSearchChallenge from './CCOneSearchChallenge';

class CCSearchChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challengesArr: [],
            tagsArr: [],
            chosenTagsID: [],
            filteredChallenges: [],
        }
        let local = true;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Challenge';
        this.apiUrlTags = 'http://localhost:' + { localHost }.localHost + '/api/Tag';
        this.apiUrlChallengeTags = 'http://localhost:' + { localHost }.localHost + '/api/ChallengeTag';
        if (!local) {
            this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/??????'; //להשלים!!
        }
    }

    componentDidMount() {
        fetch(this.apiUrl
            , {
                method: 'GET',
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
                    console.log("challengesArr= ", result);
                    this.setState({ challengesArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                });

        fetch(this.apiUrlTags
            , {
                method: 'GET',
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
                    console.log("tagsArr= ", result);
                    this.setState({ tagsArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    onTagsChange = (event, values) => {
        if(values.length == 0){         //עם אין תגיות או שמחקו את כולן אז ירוקן את הסטייט
            this.setState({ filteredChallenges: [] });
            return;
        }
        //מעבר על כל שמות התגיות שנבחרו ומציאת האיברים שלהם במערך של כל התגיות
        var tags = [];
        values.map((value) => tags.push(this.state.tagsArr.filter(tag => tag.tagName == value)[0]));
        console.log(tags);
        // מציאת המספר המזהה של כל התגיות שנבחרו
        var tagsID = tags.map((tag) => tag.tagID);
        console.log(tagsID);
        // שמירת מערך המספרים המזהים של התגיות שנבחרו בסטייט
        this.setState({ chosenTagsID: tagsID });
        // פקודת גט שמקבלת את מערך המספרים המזהים של התגיות ומחזירה את כל האתגרים שקשורים אליהן
        fetch(this.apiUrlChallengeTags + "?SrtTagsID=" + tagsID
            , {
                method: 'GET',
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
                    console.log("tagsArr= ", result);
                    this.setState({filteredChallenges: result});
                },
                (error) => {
                    console.log("err get=", error);
                });
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBar />
                <div className="col-12"> {/* חזור למסך הקודם */}
                    <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
                </div>
                <div className="col-12 turkiz">חיפוש אתגר מהמאגר</div>
                <br />
                <form onSubmit={this.Submit}>
                    <div className="form-group col-12 bc" dir="rtl">
                        <FreeSolo challenges={this.state.challengesArr} />
                    </div>
                    <div>
                        <div className="form-group input-group col-12 bc" dir="rtl">
                            <FreeSoloTags tags={this.state.tagsArr} onTagsChange={this.onTagsChange} />
                        </div>
                        <br />
                    </div>
                </form>

                <div className="col-12 DivAllTagsSearch">
                    {/* get from server ChallengeID and put it instead of key when going to CConeSmartElementOffer */}
                    {
                        this.state.filteredChallenges.map( (item) =>
                            <CCOneSearchChallenge item={item.challengeName} studentID={this.props.studentID}  />
                        )}

                </div>
                {/* {this.state.filteredChallenges.map( (item) =>
                    <div>
                        <div>{item.challengeName}</div>
                        <br />
                    </div>
                )} */}
                <Footer />
            </div>
        );
    }
}

export default CCSearchChallenge;