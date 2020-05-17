import React from 'react';


// const notificationClass = () => {
//     this.setState({
//         class: "notificationStyle"
//     }, () => {
//         setTimeout(() => {
//             this.setState({
//                 class: "notificationStyle2"
//             });
//         }, 3000);
//     });
// }
const bla= "<div className='notificationStyle'>ddddd</div>";

export const Notification = (title, body) => {
    return bla;
    // alert(title);
    // return (
    //     <div className="notificationStyle">
    //         {title} {body}
    //     </div>
    // );
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



