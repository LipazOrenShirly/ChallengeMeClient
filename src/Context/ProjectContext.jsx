import React, { Component, createContext } from 'react';

const ProjectContext = React.createContext();

export const ProjectProvider = ProjectContext.Provider;
export const ProjectConsumer = ProjectContext.Consumer;


export const user = {
    teacherID: "",
    setTeacher: (teacherIDfromLOGIN) => user.teacherID = teacherIDfromLOGIN,
    studentID: "",
    setStudent: (studentIDfromLOGIN) => user.studentID = studentIDfromLOGIN,
    studentToken: "",
    setStudentToken: (studentToken) => user.studentToken = studentToken,
  };


export default ProjectContext;