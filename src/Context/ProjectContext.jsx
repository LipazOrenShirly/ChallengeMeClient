import React, { Component, createContext } from 'react';

export const ProjectContext = createContext();

class ProjectContextProvider extends Component {
  state = {
    teacherId: "8",
    test1: 12,
    test2: "fdsfsd"
  }
  setTeacher= (teacherIDfromDB) => {
    this.setState({ teacherID: teacherIDfromDB });
  }
  render() { 
    return (
      <ProjectContext.Provider value={{teacherId: this.state.teacherId}}>
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
export default ProjectContextProvider;
