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
import NewMessage from './Component/TeacherComponents/Messages/CCNewMessage';
import EddNewChallenge from './Component/TeacherComponents/EddNewChallenge/CCEddNewChallenge';
import StudentsList from './Component/TeacherComponents/HomePageTeacher/CCStudents';
import ProjectContextProvider from './Context/ProjectContext';

function App() {
  return (
    <div className="App">
      <ProjectContextProvider>
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
          <Route path="/NewMessage" component={NewMessage} />
          <Route path="/EddNewChallenge" component={EddNewChallenge} />
          <Route path="/StudentsList" component={StudentsList} />
        </Switch>
      </ProjectContextProvider>
    </div>
  );
}

export default App;
