import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePageTeacher from './Component/TeacherComponents/HomePageTeacher/CCHomePageTeacher';
import NewTeacher from './Component/TeacherComponents/NewTeacher/CCNewTeacher';
import TeacherForgetPassword from './Component/TeacherComponents/TeacherForgetPassword/CCTeacherForgetPassword';
import TeacherLogin from './Component/TeacherComponents/TeacherLogin/CCTeacherLogin';
import teacherORstudent from './Component/TeacherComponents/teacherORstudent/CCteacherORstudent';
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
import StudentsSearchResult from './Component/TeacherComponents/HomePageTeacher/CCStudentsSearchResult';
import StudentHomePage from './Component/StudentComponents/StudentHomePage/CCStudentHomePage';
import StudentChat from './Component/StudentComponents/Messages/CCStudentChat';
import StudentLogin from './Component/StudentComponents/StudentLogin/CCStudentLogin';
import camera from './Component/StudentComponents/StudentHomePage/CCcamera';
import ChooseAvatar from './Component/StudentComponents/chooseAvatar/CCChooseAvatar';

import { ProjectProvider } from './Context/ProjectContext';
import checkCredentials from './Component/LittleComponents/checkCredentials';


function App() {
  const user = {
    teacherID: "",
    setTeacher: (teacherIDfromLOGIN) => user.teacherID = teacherIDfromLOGIN,
    studentID: "",
    setStudent: (studentIDfromLOGIN) => user.studentID = studentIDfromLOGIN,
  };

  const PrivateRoute = (children, ...rest) => {
    console.log(children);
    console.log(...rest);
    // var { username, password } = sessionStorage;
    // console.log(username, password );
    // var teacherID = checkCredentials(username, password);
    // console.log(teacherID );

    // if (teacherID != 0 ) 
    //   user.setTeacher(teacherID);  //אם קיים אז תשמור בקונטקט
    // console.log(user.teacherID );

    return (
      <Route
        {...rest}
        render={({ location }) =>
          checkCredentials(sessionStorage.username, sessionStorage.password, user) != 0 ? (children.children) : (<Redirect to="/" />)
        }
      />
    )
  };

  return (
    <div className="App">
      <ProjectProvider value={user}>
        <Switch>
          <Route exact path="/" component={teacherORstudent} />
          <Route exact path="/teacherORstudent" component={teacherORstudent} />
          <Route path="/TeacherLogin" component={TeacherLogin} />
          <Route path="/StudentLogin" component={StudentLogin} />
          <Route path="/NewTeacher" component={NewTeacher} />
          <Route path="/TeacherForgetPassword" component={TeacherForgetPassword} />

          {/* <PrivateRoute exact path="/HomePageTeacher"><HomePageTeacher /></PrivateRoute> */}
          <Route path="/HomePageTeacher" component={HomePageTeacher} />
          
          {/* <PrivateRoute exact path="/TeacherInfoScreen"><TeacherInfoScreen /></PrivateRoute> */}
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
          <Route path="/StudentChat" component={StudentChat} />
          <Route path="/StudentsSearchResult" component={StudentsSearchResult} />
          <Route path="/camera" component={camera} />
          <Route path="/ChooseAvatar" component={ChooseAvatar} />


        </Switch>
      </ProjectProvider>
    </div>
  );
}

export default App;
