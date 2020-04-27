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
          {/* <input type="text" className="form-control inputRounded" id="search" value={input} placeholder="חיפוש" onChange={(input, e) => this.handleInputChange(input, e)}></input> */}
          <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
            attributesInput={{
              id: 'search',
              type: 'text',
              placeholder: 'חפש תלמיד',
              className: "form-control inputRounded"
            }}
            value={input}
            onChange={(input, e) => {
              this.setState({input});
              this.props.sendInputToHomePage(input);
            }}
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