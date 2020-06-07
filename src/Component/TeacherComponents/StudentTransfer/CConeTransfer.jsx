import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudenTtransfer.css';
// import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import ProjectContext from '../../../Context/ProjectContext';
import FreeSoloClasses from '../../LittleComponents/FreeSoloClasses';
import localHost from '../../LittleComponents/LocalHost';

export default class oneTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickConfirm: false,
            classArr: [],
            classIDToTransfer: null,
            newClassToTransfer: null,
        }
        let local = false;
        this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        if (!local) {
            this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Class';

        }
    }
    static contextType = ProjectContext;

    getClasses = () => {
        const user = this.context;
        fetch(this.apiUrl + '?teacherID= ' + user.teacherID
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
                if (!res.ok)
                    throw new Error('Network response was not ok.');
                return res.json();
            })
            .then(
                (result) => {
                    console.log("classArr= ", result);
                    this.setState({ classArr: result });
                },
                (error) => {
                    console.log("err get=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'רשימת הכיתות לא נטענה כראוי אנא כנס לדף שנית',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });
    }

    onChangeClass = (event, value) => {
        console.log(value);
        var classID = value != null ? value.classID : null;
        this.setState({ classIDToTransfer: classID });
    }

    onInputChangeClass = (event, value) => {
        console.log(value);
        var className = value == "" ? null : value;
        this.setState({ newClassToTransfer: className });
    }

    confirm = async () => {
        if (this.state.newClassToTransfer == null) return;
        var classID = await this.state.classIDToTransfer;
        alert("classID"+classID);
        if (this.state.classIDToTransfer == null) {
            classID = await this.postClass(this.state.newClassToTransfer);
            alert("new classID is null "+classID);
        }
        await this.props.confirmTransfer(this.props.transferItem.transferID, classID, this.props.transferItem.studentID,this.props.transferItem.teacherFrom);
    }

    postClass = (className) => {
        const user = this.context;
        var classObj = {
            className: className,
            teacherID: user.teacherID
        }
        fetch(this.apiUrl + "/postClassReturnID", {
            method: 'POST',
            body: JSON.stringify(classObj),
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
                    return result;
                },
                (error) => {
                    console.log("err post=", error);
                    //תוקן
                    Swal.fire({
                        title: 'משהו השתבש',
                        text: 'ההודעה לא נשלחה, נסה שוב',
                        icon: 'warning',
                        confirmButtonColor: '#e0819a',
                    })
                });


    }
    render() {
        const user = this.context;
        var transferItem = this.props.transferItem;
        var teacherFrom = this.props.transferItem.teacherFrom;
        var teacherTo = this.props.transferItem.teacherTo;
        var statusString = transferItem.status == 1 ? "הבקשה ממתינה לאישור" : transferItem.status == 2 ? "הבקשה אושרה" : transferItem.status == 3 ? "הבקשה נדחתה" : "הבקשה בוטלה על ידך";
        var date = new Date(transferItem.Date);
        var transferDate = date.toISOString().split('T')[0].replace(/(....).(..).(..)/, "$3/$2/$1");
        return (


            <div className="row justify-content-center oneTransferDiv">

                {teacherFrom == user.teacherID && //שיוך שאני עשיתי
                    <div className={"col-11 transferStudendDivOne MeStatus" + transferItem.status} dir="rtl" >
                        <div className="col-12" >
                            <div className="headlineTransferMe">שלחת בקשה ל{transferItem.firstNameTo} {transferItem.lastNameTo} לשיוך התלמיד {transferItem.firstNameS} {transferItem.lastNameS}</div>
                            <div className="statusTransfer">{statusString}</div>
                            <div className="dateTransfer">{transferDate}</div>
                            {
                                transferItem.status == 1 &&
                                <div className="justify-content-center">
                                    <button className="btn btn-info btnPink btnCancel" onClick={() => this.props.cancelTransfer(transferItem.transferID)}>בטל</button>
                                </div>
                            }
                        </div>
                    </div>
                }

                {teacherTo == user.teacherID && transferItem.status != 4 && //שיוך שמישהו עשה
                    <div className="col-11 transferStudendDivOne" dir="rtl" >
                        <div className="col-12">
                            <div className="headlineTransferOther">{transferItem.firstNameFrom} {transferItem.lastNameFrom} שלח לך בקשה לשיוך התלמיד {transferItem.firstNameS} {transferItem.lastNameS}</div>
                            <div className="statusTransfer">{statusString}</div>

                            {
                                transferItem.comment != "" &&
                                < div className="commentTransfer">הערת המורה:<br />{transferItem.comment}</div>
                            }

                            <div className="dateTransfer">{transferDate}</div>
                            {
                                transferItem.status == 1 && this.state.clickConfirm == false &&
                                <div className="row justify-content-between">
                                    <button className="btn btn-info btnPink col-5" onClick={() => { this.setState({ clickConfirm: true }); this.getClasses(); }}>אשר</button>
                                    <button className="btn btn-info btnPink col-5 declineBtn" onClick={() => this.props.declineTransfer(transferItem.transferID)}>דחה</button>
                                </div>
                            }
                            {
                                this.state.clickConfirm == true &&
                                <div>
                                    <FreeSoloClasses
                                        options={this.state.classArr}
                                        onChangeClass={this.onChangeClass}
                                        onInputChangeClass={this.onInputChangeClass}
                                        label='בחר כיתה אליה יכנס התלמיד'
                                        id='TransferToClass' />
                                    <button className="btn btn-info btnPink" onClick={this.confirm}>בצע את ההעברה</button>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>


        );
    };
}