import React from "react";
import './styleLittleComponen.css'


const SearchBarHomeTeacher = () => {
  return (
 <div className="row col-12">
 <div className="col-2 massegesTeacherHomePage" >הודעות</div>
 <div className="form-group col-8 searchTeacherHomePage">
     <input type="text" className="form-control inputRounded" id="search" placeholder="חיפוש"></input>
 </div>
 <div className="col-2 alertsTeacherHomePage">התרעות</div>
</div> 
);
}

export default SearchBarHomeTeacher;