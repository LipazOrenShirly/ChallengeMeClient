import React from "react";
import './styleLittleComponen.css'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const NavBar = () => {
  return (
    <Navbar className="colorNav" expand="lg">
  <Navbar.Brand href="/HomePageTeacher"><img src={require('../../img/logoSmall.svg')}></img></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/TeacherInfoScreen">עדכון פרטים אישיים</Nav.Link>
      <Nav.Link href="/Alerts">התרעות מערכת</Nav.Link>
      <Nav.Link href="/Messages">הודעות</Nav.Link>
      <Nav.Link href="/EddNewChallenge">הוספת אתגר חדש</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>


    </Form>
  </Navbar.Collapse>
</Navbar>
  );
}
export default NavBar;