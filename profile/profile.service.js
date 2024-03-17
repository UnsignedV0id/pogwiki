const { v4: uuidv4 } = require("uuid");
const Profile = require("./profile.entity.js");
const ProfileDTO = require("./profile.dto.js");
const { GenericException } = require("../generic-exception.js");

const profile = [
  {
    id: "2",
    userID: "1",
    street : "Street 45",
    city : "San Andreas",
    state : "Los Angeles",
    country_id : "1",
  }
  // {
  //   id: uuidv4(),
  //   userID: 
  //   street : "Stret 50",
  //   city : "Vice city",
  //   state : "Los Angeles",
  //   country_id : 1,
  // },
];

class ProfileService {
  // addAddress(id, userID, street, city, state, country_id) {
  //   id = uuidv4();
  //   const newprofile = new profile(id, userID, street, city, state, country_id);
  //   Profile.push(newprofile);
  //   return newprofile;
  // }
  
  // updateAddress(userID, addressID, street, city, state , country_id) {
  //   const profileIndex = Profile.findIndex((profile) => profile.id === addressID && profile.userID === userID );
  //   if (profileIndex === -1) return null;
  //   const updatedprofile = {addressID, street, city, state , country_id };
  //   Profile[profileIndex] = updatedprofile;
  //   return updatedprofile;
  // // }

  // removeAddress(addressID) {
  //   console.log(1)
  //   // const profileIndex = profile.findIndex((profile) => profile.id === addressID);
  //   // if (profileIndex === -1) return false;
  //   // profile.splice(profileIndex, 1);
  //   return true;
  // }

  listAddress(userID) {
    return profile.find((profile) => profile.userID === userID);
  }



}

module.exports = ProfileService;
