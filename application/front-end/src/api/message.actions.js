import axios from "axios";
import api_config from './config/api.config';

// endpoint returns array of javascript chatObject(s)
// chatObject.chatId <-- reference to chat table row
// chatObject.listing  <--- reference to listing table row
// chatObject.userOneEmail
// chatObject.userTwoEmail
// chatObject.messages

export const getInbox = (handleResponse) => {
  let sessionToken = JSON.parse(sessionStorage.getItem('session')).token

   axios({
      method: 'get',
      url: `http://${api_config.environment}/messages/inbox`,
      headers:{
      	'Session': sessionToken
      },
   }).then((res) => {
   	 //http response returns array of json chat objects
   	 handleResponse(res.data);
   });
};

// messagePacket has multiple fields
// messagePacket.chatId
// messagePacket.senderEmail
// messagePacket.message

export const sendMessage = (messagePacket, handleResponse) => {
  let sessionToken = JSON.parse(sessionStorage.getItem('session')).token

   axios({
      method: 'post',
      url: `http://${api_config.environment}/messages/send`,
      data:{
         'messagePacket': messagePacket,
      },
      headers:{
         'Session': sessionToken,
      },
   
   }).then((res) => {       
       handleResponse();
   });
};

export const sendNewMessage = (messagePacket, handleResponse) => {
  let sessionToken = JSON.parse(sessionStorage.getItem('session')).token
   axios({
      method: 'post',
      url: `http://${api_config.environment}/messages/new`,
      data:{
         'messagePacket': messagePacket,
      },
      headers:{
         'Session': sessionToken,
      },
   }).then((res) => {       
       handleResponse();
   });
};
