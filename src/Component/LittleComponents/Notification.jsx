import React from 'react';


export const Notification = ({ title, body, setShowNotification }) => {
var bodyShort =  body.length > 19 ? body.slice(0, 20) + "..." : body;
    return (
        <div className="row justify-content-center align-items-center" dir="rtl">
            <div onClick={e => setShowNotification(false)} className="notificationStyle col-10">
               <div className="titleNotification"> {title} </div> 
               <div> {bodyShort} </div>
            </div>
        </div>
    );
}











// export default class Notification extends Component {
//     constructor(props){
//         super(props);
//         this.state = { 
//             show: true,
//             class: "notificationStyle"
//         }
//     }

//     componentDidMount() {
//         this.showNotification();
//     }

//     onShow = () => {

//     }

//     showNotification = () => {
//         this.setState({
//             class: "notificationStyle"
//         }, () => {
//             setTimeout( () => {
//                 this.setState({
//                     class: "notificationStyle2"
//                 });
//             }, 3000);
//         });        
//     }


//     render() { 
//         return ( 
//             <div className={this.state.class}>Example
//                 {/* {this.props.title} {this.props.body} */}
//             </div>
//          );
//     }
// }



