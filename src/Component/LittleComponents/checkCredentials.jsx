import localHost from './LocalHost';
import ProjectContext from '../../Context/ProjectContext';


const checkCredentials = (username, password, user) => {

    let local = false;
    var apiUrlTeacher = 'http://localhost:' + { localHost }.localHost + '/api/Teacher';
    var apiUrlStudent = 'http://localhost:' + { localHost }.localHost + '/api/Student';
    if (!local) {
        apiUrlTeacher = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacher';
        apiUrlStudent = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Student';
    }

    fetch(apiUrlTeacher + '?username=' + username + '&password=' + password
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
          return res.json();        })
        .then(
            (result) => {
                console.log("Submit= ", result);
                console.log("Submit= ", JSON.stringify(result));
                if (result.TeacherID != 0)
                    user.setTeacher(result.TeacherID);  //אם קיים אז תשמור בקונטקט

                return result.TeacherID;
            },
            (error) => {
                console.log("err get=", error);
            });
}

export default checkCredentials;