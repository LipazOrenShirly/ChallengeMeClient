import React, { Component, createContext } from 'react';

export const ProjectContext = createContext();

class ProjectContextProvider extends Component {
  state = {
    teacherID: "",
  }
  setTeacher = (teacherIDfromDB) => {
    this.setState({ teacherID: teacherIDfromDB });
  }
  render() { 
    return (
      <ProjectContext.Provider value={{...this.state, setTeacher: this.setTeacher}}>
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
export default ProjectContextProvider;
