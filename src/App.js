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
import Chat from './Component/TeacherComponents/Messages/CCChat';
import AddNewChallenge from './Component/TeacherComponents/AddNewChallenge/CCAddNewChallenge';
import StudentsList from './Component/TeacherComponents/HomePageTeacher/CCStudents';
import StudentPage from './Component/TeacherComponents/StudentPage/CCStudentPage';
import StudentDetails from './Component/TeacherComponents/StudentPage/CCStudentDetails';
import StudentInfoScreen from './Component/TeacherComponents/StudentInfoScreen/CCStudentInfoScreen';
import EditChallenge from './Component/TeacherComponents/StudentPage/CCEditChallenge';
import InputTests from './Component/InputTests/InputTests';
import InputTests2 from './Component/InputTests/InputTests2';
import AddChallengeToStudent from './Component/TeacherComponents/AddChallengeToStudent/CCAddChallengeToStudent';
import AddNewStudent from './Component/TeacherComponents/AddNewStudent/CCAddNewStudent';
import StudentFeatures from './Component/TeacherComponents/StudentFeatures/CCStudentFeatures';
import ExtraChallengeDetails from './Component/TeacherComponents/ExtraChallengeDetails/CCExtraChallengeDetails';
import SearchChallenge from './Component/TeacherComponents/SearchChallenge/CCSearchChallenge';
import ChallengePage from './Component/StudentComponents/StudentHomePage/CCChallengePage';
import StudentHomePage from './Component/StudentComponents/StudentHomePage/CCStudentHomePage';
import StudentMessages from './Component/StudentComponents/Messages/CCStudentMessages'
import StudentChat from './Component/StudentComponents/Messages/CCStudentChat'

import {ProjectProvider} from './Context/ProjectContext';


function App() {
  const user = { 
    teacherID: 8, 
    setTeacher: (teacherIDfromLOGIN) => user.teacherID = teacherIDfromLOGIN,
    studentID: 21,
    setStudent: (studentIDfromLOGIN) => user.studentID = studentIDfromLOGIN,
  }

  return (
    <div className="App">
      <ProjectProvider value={user}>
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
          <Route path="/AddNewChallenge" component={AddNewChallenge} />
          <Route path="/StudentsList" component={StudentsList} />
          <Route path="/StudentPage" component={StudentPage} />
          <Route path="/StudentDetails" component={StudentDetails} />
          <Route path="/StudentInfoScreen" component={StudentInfoScreen} />
          <Route path="/EditChallenge" component={EditChallenge} />
          <Route path="/InputTests" component={InputTests} />
          <Route path="/InputTests2" component={InputTests2} />
          <Route path="/AddChallengeToStudent" component={AddChallengeToStudent} />
          <Route path="/AddNewStudent" component={AddNewStudent} />
          <Route path="/StudentFeatures" component={StudentFeatures} />
          <Route path="/ExtraChallengeDetails" component={ExtraChallengeDetails} />
          <Route path="/SearchChallenge" component={SearchChallenge} />
          <Route path="/Chat" component={Chat} />
          <Route path="/ChallengePage" component={ChallengePage} />
          <Route path="/StudentHomePage" component={StudentHomePage} />
          <Route path="/StudentMessages" component={StudentMessages} />
          <Route path="/StudentChat" component={StudentChat} />

          
        </Switch>
      </ProjectProvider>
    </div>
  );
}

export default App;
