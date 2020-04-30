import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleAlertsSetting.css'
import Footer from '../../LittleComponents/Footer';
import NavBar from '../../LittleComponents/NavBar';
import Switch from "react-switch";
import { TiArrowBack } from 'react-icons/ti';
import ProjectContext from '../../../Context/ProjectContext';
import localHost from '../../LittleComponents/LocalHost';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import Swal from 'sweetalert2';

export default class CCAlertsSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSettings: false, 
      alertSettingID: null,
      checkedSuccess: false,
      checkedFailure: false,
      checkedNeedHelp: false,
      checkedReachDadline: false,
      daysPreDadline: 0,
      daysIdleStudent: 0,
    };
    let local = true;
    this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/AlertSettings';
    if (!local) {
      this.apiUrl = 'http://proj.ruppin.ac.il/igroup2/prod' + '/api/AlertSettings';
    }
  }

  static contextType = ProjectContext;

  componentDidMount() {
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
        return res.json();
      })
      .then(
        (result) => {
          console.log("AlertSettings= ", result);
          if (result.AlertSettingID == 0) //אם אין למורה הזה עדיין הגדרות תצא מהפונקציה ואל תכניס כלום לסטייט
            return;
          this.setState({   // רק אם יש למורה כבר הגדרות נגיע לפה ונכניס לסטייט
            hasSettings: true,
            alertSettingID: result.AlertSettingID,
            checkedSuccess: result.AlertPositive,
            checkedFailure: result.AlertNegative,
            checkedNeedHelp: result.AlertHelp,
            checkedReachDadline: result.AlertLate,
            daysPreDadline: result.AlertPreDate,
            daysIdleStudent: result.AlertIdle,
          });
          console.log(this.state);
        },
        (error) => {
          console.log("err get=", error);
        });
  }

  postSettings = () => {
    const user = this.context;

    var settings = {
      teacherID: user.teacherID,
      alertPositive: this.state.checkedSuccess,
      alertNegative: this.state.checkedFailure,
      alertHelp: this.state.checkedNeedHelp,
      alertLate: this.state.checkedReachDadline,
      alertPreDate: this.state.daysPreDadline,
      alertIdle: this.state.daysIdleStudent,
  }
  fetch(this.apiUrl, {
      method: 'POST',
      body: JSON.stringify(settings),
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
              this.setState({hasSettings: true, alertSettingID: result});
              Swal.fire({
                  title: 'מעולה!',
                  text: 'הגדרות להתראות נשמרו בהצלחה!',
                  icon: 'success',
                  confirmButtonColor: '#e0819a',
              });
          },
          (error) => {
              console.log("err post=", error);
          });
  }

  putSettings = () => {
    const user = this.context;

    var settings = {
      alertSettingID: this.state.alertSettingID,
      teacherID: user.teacherID,
      alertPositive: this.state.checkedSuccess,
      alertNegative: this.state.checkedFailure,
      alertHelp: this.state.checkedNeedHelp,
      alertLate: this.state.checkedReachDadline,
      alertPreDate: this.state.daysPreDadline,
      alertIdle: this.state.daysIdleStudent,
  }
  fetch(this.apiUrl, {
      method: 'PUT',
      body: JSON.stringify(settings),
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
              console.log("fetch PUT= ", result);
              Swal.fire({
                  title: 'מעולה!',
                  text: 'הגדרות להתראות עודכנו בהצלחה!',
                  icon: 'success',
                  confirmButtonColor: '#e0819a',
              });
          },
          (error) => {
              console.log("err put=", error);
          });
  }

  render() {
    var { checkedSuccess,
      checkedFailure,
      checkedNeedHelp,
      checkedReachDadline,
      daysPreDadline,
      daysIdleStudent } = this.state;
    return (
      <div className="container-fluid">
        <NavBar /> <br />
        <div className="col-12"> {/* חזור למסך הקודם */}
          <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
        </div>
        <div className="col-12">
          <div className="row col-12">
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד מסמן שהצליח אתגר</div>
            <div className="SwitchDiv col-2">
              <Switch id="SwitchSuccess" className="Switches" onChange={(checked) => this.setState({ checkedSuccess: checked })} checked={checkedSuccess} onColor="#CFA6D6" />
            </div>
          </div>
          <br />
          <div className="row col-12">
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד מסמן שלא הצליח אתגר</div>
            <div className="SwitchDiv col-2">
              <Switch id="SwitchFailure" className="Switches" onChange={(checked) => this.setState({ checkedFailure: checked })} checked={checkedFailure} onColor="#CFA6D6" />
            </div>
          </div>
          <br />
          <div className="row col-12">
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד מסמן שהוא צריך עזרה</div>
            <div className="SwitchDiv col-2">
              <Switch id="SwitchNeedHelp" className="Switches" onChange={(checked) => this.setState({ checkedNeedHelp: checked })} checked={checkedNeedHelp} onColor="#CFA6D6" />
            </div>
          </div>
          <br />
          <div className="row col-12">
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד לא השלים את האתגר וכבר הגיע הדד ליין</div>
            <div className="SwitchDiv col-2">
              <Switch id="SwitchReachDadline" className="Switches" onChange={(checked) => this.setState({ checkedReachDadline: checked })} checked={checkedReachDadline} onColor="#CFA6D6" />
            </div>
          </div>
          <br />
          <div className="row col-12">
            <div className="AlertSettingText col-10">קבלת התראה ? ימים לפני שמגיע דד ליין</div>
            <div className="SwitchDiv col-2">
              <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                attributesInput={{
                  id: 'daysPreDadline',
                  type: 'number',
                  placeholder: 'מספר ימים',
                  className: "",
                }}
                value={daysPreDadline}
                // validationCallback={res =>
                //     this.setState({ HaslastNameValError: res, validate: false })
                // }
                onChange={(daysPreDadline, e) => { //כל שינוי הוא שומר בסטייט
                  this.setState({ daysPreDadline });
                }}
              // validationOption={{
              //     check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
              //     required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
              //     customFunc: async v => {
              //         return true;
              //     }
              // }}
              />
            </div>
          </div>
          <br />
          <div className="row col-12">
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד לא נכנס לאפליקציה ? ימים</div>
            <div className="SwitchDiv col-2">
              <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                attributesInput={{
                  id: 'daysIdleStudent',
                  type: 'number',
                  placeholder: 'מספר ימים',
                  className: "",
                }}
                value={daysIdleStudent}
                // validationCallback={res =>
                //     this.setState({ HaslastNameValError: res, validate: false })
                // }
                onChange={(daysIdleStudent, e) => { //כל שינוי הוא שומר בסטייט
                  this.setState({ daysIdleStudent });
                }}
              // validationOption={{
              //     check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
              //     required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
              //     customFunc: async v => {
              //         return true;
              //     }
              // }}
              />
            </div>
          </div>
          <button onClick={() => this.state.hasSettings ? this.putSettings() : this.postSettings()}>שמור</button>
        </div>
        <Footer />
      </div>
    );
  };
}



