const { v4: uuidv4 } = require("uuid");
const Comments = require("./comments.entity.js");
const CommentsDTO = require("./comments.dto.js");
const { GenericException } = require("../generic-exception.js");

const comments = [
  // {
  //   id: "1",
  //   userID: "1",
  //   street : "Street 45",
  //   city : "San Andreas",
  //   state : "Los Angeles",
  //   country_id : "1",
  // }
  // {
  //   id: uuidv4(),
  //   userID: 
  //   street : "Stret 50",
  //   city : "Vice city",
  //   state : "Los Angeles",
  //   country_id : 1,
  // },
];

class CommentsService {
  addComments(page, createdBy, content) {
    let id = uuidv4();
    let state = "unmoderated";
    let stateText = "unmoderated";
    const newComments = new Comments(id, page, state, stateText, createdBy, content );
    console.log(newComments);
    return newComments;
  }

  // updateComments(userID, Comments_id, street, city, state , country_id) {
  //   const CommentsIndex = Comments.findIndex((Comments) => Comments.id === Comments_id && Comments.userID === userID );
  //   if (CommentsIndex === -1) return null;
  //   const updatedComments = { street, city, state , country_id };
  //   Comments[CommentsIndex] = updatedComments;
  //   return updatedComments;
  // }

  // // removeComments(CommentsID) {
  // //   console.log(1)
  // //   // const CommentsIndex = Comments.findIndex((Comments) => Comments.id === CommentsID);
  // //   // if (CommentsIndex === -1) return false;
  // //   // Comments.splice(CommentsIndex, 1);
  // //   return true;
  // // }

  // listComments(userID) {
  //   console.log(Comments);
  //   return Comments.filter((Comments) => Comments.userID === userID);
  // }

  // listSingleComments(userID, CommentsID) {
  //   return Comments.filter((Comments) => Comments.userID === userID && Comments.id === CommentsID );
  // }
;

}

module.exports = CommentsService;
