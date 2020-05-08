import React, { Component } from 'react';
import './styleLittleComponen.css'
import { MdMail } from "react-icons/md";
import { FaExclamationCircle } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ProjectContext from '../../Context/ProjectContext';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';

export default class SearchBarHomeTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }
  static contextType = ProjectContext;

  // 

  render() {
    const user = this.context;
    const {input} = this.state;
    return (
      <div className="row col-12">
        <div className="col-3 massegesTeacherHomePage">
          <Link to="/Messages" className="linkColor">
            <Badge badgeContent={this.props.countMessages} color="secondary">
              <MdMail size={40} />
            </Badge>
          </Link>
        </div>

        <div className="form-group col-6 searchTeacherHomePage">
          <input type="text" className="form-control inputRounded" id="search" placeholder='חפש תלמיד'
            value={input} onChange={(e) => {this.setState({input: e.target.value}); this.props.sendInputToHomePage(e);}}
          />
        </div>

        <div className="col-3 alertsTeacherHomePage" >

          <Link to="/Alerts" className="linkColor">
            <Badge badgeContent={this.props.countAlerts} color="secondary">
              <FaExclamationCircle size={40} />
            </Badge>
          </Link>
        </div>
      </div>
    );
  }
}