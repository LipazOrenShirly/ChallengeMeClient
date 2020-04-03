import React, { Component } from 'react';
import '../../../css/Style.css';
import './styleTeacherLogin.css';
import $ from 'jquery';
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';


export default class pas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword1: "",
      newPassword2: "",
      HasnewPassword1ValError:true,
      HasnewPassword2ValError:true,
    }}

    render() {
        const {
          newPassword1, newPassword2
        } = this.state;
    
        return (
<div className="form-group col-12">
                  <Textbox  // כדי שיפעלו הולידציות שמים את האינפוט בטקסט בוקס
                          attributesInput={{
                              id: 'NewTPassword',
                              type: 'password',
                              placeholder: 'הזן ססמה',
                              className: "form-control inputNewTeacher"
                          }}

                          value={newPassword1}
                          validationCallback={res =>
                              this.setState({ HasnewPassword1ValError: res, validate: false })
                          }
                          onChange={(newPassword1, e) => { //כל שינוי הוא שומר בסטייט
                              this.setState({ newPassword1 });
                              console.log(e);
                          }}
                          onBlur={(e) => { console.log(e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                          validationOption={{
                              check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                              required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                                  customFunc: pas => { //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
                                      const reg = /^(?=.*[A-Za-z])(?=.*\d)([@$!%*#?&]*)[A-Za-z\d@$!%*#?&]{8,}$/;
                                      if (reg.test(pas)) {
                                        return true;
                                      } else {
                                          this.setState({ HasnewPassword1ValError: true });
                                          return "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
                                      }
                                  }
                          }}
                      />
                  </div>
        )}}