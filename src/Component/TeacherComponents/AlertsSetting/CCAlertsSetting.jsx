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
import $ from 'jquery';

export default class CCAlertsSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertSettingID: null,
      checkedSuccess: false,
      checkedFailure: false,
      checkedNeedHelp: false,
      checkedReachDadline: false,
      daysPreDadline: '10',
      daysIdleStudent: '14'
    };
    let local = false;
    this.apiUrl = 'http://localhost:' + { localHost }.localHost + '/api/AlertSettings';
    if (!local) {
      this.apiUrl = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/AlertSettings';
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
        if (!res.ok)
          throw new Error('Network response was not ok.');
        return res.json();
      })
      .then(
        (result) => {
          console.log("AlertSettings= ", result);
          if (result.AlertSettingID == 0) //אם אין למורה הזה עדיין הגדרות תצא מהפונקציה ואל תכניס כלום לסטייט
            return;
          this.setState({   // רק אם יש למורה כבר הגדרות נגיע לפה ונכניס לסטייט
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
          Swal.fire({
            title: 'אוי',
            text: 'הפעולה נכשלה, נסה שנית',
            icon: 'warning',
            confirmButtonColor: '#e0819a',
          })
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
        if (!res.ok)
          throw new Error('Network response was not ok.');
        return res.json();
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
          this.props.history.push( '/HomePageTeacher' );
        },
        (error) => {
          console.log("err put=", error);
          Swal.fire({
            title: 'אוי',
            text: 'הפעולה נכשלה, נסה שנית',
            icon: 'warning',
            confirmButtonColor: '#e0819a',
          })
        });
  }

  render() {
    var { checkedSuccess,
      checkedFailure,
      checkedNeedHelp,
      checkedReachDadline,
      daysPreDadline,
      daysIdleStudent
    } = this.state;
    return (
      <div className="container-fluid">
        <NavBar />
        <div className="col-12"> {/* חזור למסך הקודם */}
          <TiArrowBack className="iconArrowBack" onClick={() => window.history.back()} size={40} />
        </div>
        <div className="col-12">
          <p className="alertSettingsTitle">
            :סמן אילו התרעות תרצה לראות
        </p>

          <div className="row">
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד מסמן שהצליח אתגר</div>
            <Switch id="SwitchSuccess" className="Switches" onChange={(checked) => this.setState({ checkedSuccess: checked })} checked={checkedSuccess} onColor="#CFA6D6" />
          </div>
          <br />
          <div className="row">
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד מסמן שלא הצליח אתגר</div>
            <Switch id="SwitchFailure" className="Switches" onChange={(checked) => this.setState({ checkedFailure: checked })} checked={checkedFailure} onColor="#CFA6D6" />
          </div>
          <br />
          <div className="row">
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד מסמן שהוא צריך עזרה</div>
            <Switch id="SwitchNeedHelp" className="Switches" onChange={(checked) => this.setState({ checkedNeedHelp: checked })} checked={checkedNeedHelp} onColor="#CFA6D6" />
          </div>
          <br />
          <div className="row" style={{ padding: '2%' }}>
            <div className="AlertSettingText col-10">קבלת התראה כאשר תלמיד לא השלים את האתגר וכבר הגיע הדד ליין</div>
            <Switch id="SwitchReachDadline" className="Switches" onChange={(checked) => this.setState({ checkedReachDadline: checked })} checked={checkedReachDadline} onColor="#CFA6D6" />
          </div>
          <br />

          <div className="AlertSettingText">מספר ימים לפני קבלת ההתראה שעומד להגיע הדדליין</div>
          <div className="SwitchDiv" style={{ marginTop: '3%' }}>
            <select value={daysPreDadline} dir="rtl" className="custom-select inputNewTeacher" onChange={(e) => this.setState({ daysPreDadline: e.target.value })}>
              <option value="2">יומיים לפני</option>
              <option value="5">חמישה ימים לפני</option>
              <option value="10">עשרה ימים לפני</option>
              <option value="15">חמישה עשר ימים לפני</option>
            </select>
          </div>

          <br />
          <div className="AlertSettingText">קבלת התראה כאשר תלמיד לא נכנס לאפליקציה מספר ימים</div>
          <div className="SwitchDiv" style={{ marginTop: '3%' }}>
            <select value={daysIdleStudent} dir="rtl" className="custom-select inputNewTeacher" onChange={(e) => this.setState({ daysIdleStudent: e.target.value })}>
              <option value="7">שבוע</option>
              <option value="14">שבועיים</option>
              <option value="21">שלושה שבועות</option>
              <option value="28">חודש</option>
            </select>
          </div>
          <br />
          <button className="btn btn-info btnPink" style={{ marginBottom: '30px' }} onClick={() => this.putSettings()}>שמור</button>
        </div>
        <Footer />
      </div>
    );
  };
}



