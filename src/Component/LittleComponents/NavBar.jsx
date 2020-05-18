import React, { useContext } from "react";
import './styleLittleComponen.css'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import localHost from '../../LittleComponents/LocalHost';
import ProjectContext from '../../Context/ProjectContext';
import { NavLink, Link } from 'react-router-dom';

const logout = async () => {
  const user = await useContext(ProjectContext);

  let local = false;
  apiUrlTeacer = 'http://localhost:' + { localHost }.localHost + '/api/Teacer';
  if (!local) {
      apiUrlTeacer = 'https://proj.ruppin.ac.il/igroup2/prod' + '/api/Teacer';
  }

  var data = await {
    teacherID: user.teacherID,
    teacherToken: ""
  }

  await fetch(apiUrlTeacer + '/teacherToken', {
    method: 'PUT',
    body: JSON.stringify(data),
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
      },
      (error) => {
        console.log("err post=", error);
        Swal.fire({
          title: 'אוי',
          text: 'הפעולה נכשלה, נסה שנית',
          icon: 'warning',
          confirmButtonColor: '#e0819a',
        })
      });
  sessionStorage.clear();
  localStorage.clear();
}

const NavBar = () => {
  return (
    <Navbar className="colorNav" expand="lg">
      <Navbar.Brand><Link to="/HomePageTeacher"><img src={require('../../img/logoSmall.svg')}></img></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/TeacherInfoScreen">הפרטים שלי</NavLink>
          <NavLink to="/Alerts">התרעות מערכת</NavLink>
          <NavLink to="/Messages">הודעות</NavLink>
          <NavLink to="/TeacherLogin" onClick={logout}>התנתק</NavLink>

          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Form inline>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;