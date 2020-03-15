import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePageTeacher from './Component/TeacherComponents/HomePageTeacher/CCHomePageTeacher';
import NewTeacher from './Component/TeacherComponents/NewTeacher/CCNewTeacher';
import TeacherForgetPassword from './Component/TeacherComponents/TeacherForgetPassword/CCTeacherForgetPassword';
import TeacherLogin from './Component/TeacherComponents/TeacherLogin/CCTeacherLogin';
import teacherORstudent from './Component/TeacherComponents/teacherORstudent/CCteacherORstudent';
import StudentLogin from './Component/StudentComponents/StudentLogin/CCStudentLogin';
import TeacherInfoScreen from './Component/TeacherComponents/TeacherInfoScreen/CCTeacherInfoScreen';
import Alerts from './Component/TeacherComponents/Alerts/CCAlerts';
import AlertsSetting from './Component/TeacherComponents/AlertsSetting/CCAlertsSetting';
import Messages from './Component/TeacherComponents/Messages/CCMessages';



function App() {
  return (
    <div className="App">
    <Switch>
        <Route exact path="/" component={teacherORstudent} />
        <Route path="/TeacherLogin" component={TeacherLogin} />
        <Route path="/StudentLogin" component={StudentLogin} />
        <Route path="/NewTeacher" component={NewTeacher} />
        <Route path="/TeacherForgetPassword" component={TeacherForgetPassword} />
        <Route path="/HomePageTeacher" component={HomePageTeacher} />
        <Route path="/TeacherInfoScreen" component={TeacherInfoScreen} />
        <Route path="/Alerts" component={Alerts} />
        <Route path="/AlertsSetting" component={AlertsSetting} />
        <Route path="/Messages" component={Messages} />

        
        
        
        </Switch>
    </div>
  );
}

export default App;