import React, { useContext } from "react";
import './styleLittleComponen.css'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import ProjectContext from '../../Context/ProjectContext';
import { NavLink, Link } from 'react-router-dom';

const logout = () => {
  sessionStorage.clear(); 
  localStorage.clear();
  //put-- delete token
  
 }

const NavBar = () => {
  const user = useContext(ProjectContext);

  return (
    <Navbar className="colorNav" expand="lg">
      <Navbar.Brand><Link to="/HomePageTeacher"><img src={require('../../img/logoSmall.svg')}></img></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/TeacherInfoScreen">הפרטים שלי</NavLink>
          <NavLink to="/Alerts">התרעות מערכת</NavLink>
          <NavLink to="/Messages">הודעות</NavLink>
          <NavLink to="/TeacherLogin" onClick={ logout }>התנתק</NavLink>

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