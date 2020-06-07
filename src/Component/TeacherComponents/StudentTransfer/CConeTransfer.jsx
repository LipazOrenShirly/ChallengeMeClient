import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleStudenTtransfer.css';
// import localHost from '../../LittleComponents/LocalHost';
import Swal from 'sweetalert2';
import ProjectContext from '../../../Context/ProjectContext';


export default class oneTransfer extends Component {
    constructor(props) {
        super(props);
        // let local = false;
        // this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/Class';
        // if (!local) {
        //     this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod'+ '/api/Class';

        // }
    }
    static contextType = ProjectContext;

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
                    <div className="col-11 transferStudendDivOne" dir="rtl" >
                        <div className="col-12" >
                            <div className="headlineTransfer">שלחת בקשה ל{transferItem.firstNameFrom} {transferItem.lastNameFrom} לשיוך התלמיד {transferItem.firstNameS} {transferItem.lastNameS}</div>
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
                            <div className="headlineTransfer">{transferItem.firstNameFrom} {transferItem.lastNameFrom} שלח לך בקשה לשיוך התלמיד {transferItem.firstNameS} {transferItem.lastNameS}</div>
                            <div className="statusTransfer">{statusString}</div>

                            {
                                transferItem.comment != "" &&
                                < div className="commentTransfer">הערת המורה- {transferItem.comment}</div>
                            }

                            <div className="dateTransfer">{transferDate}</div>
                            {
                                transferItem.status == 1 &&
                                <div className="row justify-content-between">
                                    <button className="btn btn-info btnPink col-5" onClick={() => this.props.confirmTransfer(transferItem.transferID)}>אשר</button>
                                    <button className="btn btn-info btnPink col-5 declineBtn" onClick={() => this.props.declineTransfer(transferItem.transferID)}>דחה</button>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>


        );
    };
}