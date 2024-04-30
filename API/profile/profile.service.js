const { v4: uuidv4 } = require("uuid");
const Profile = require("./profile.entity.js");
const ProfileDTO = require("./profile.dto.js");
const { GenericException } = require("../generic-exception.js");

const profile = [
  {
    id: "1",
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
  addAddress(id, userID, street, city, state, country_id) {
    id = uuidv4();
    const newProfile = new Profile(id, userID, street, city, state, country_id);
    console.log(newProfile);
    console.log("newProfile");
    profile.push(newProfile);
    return newProfile;
  }

  updateAddress(userID, address_id, street, city, state , country_id) {
    const profileIndex = Profile.findIndex((profile) => profile.id === address_id && profile.userID === userID );
    if (profileIndex === -1) return null;
    const updatedprofile = { street, city, state , country_id };
    Profile[profileIndex] = updatedprofile;
    return updatedprofile;
  }

  // removeAddress(addressID) {
  //   console.log(1)
  //   // const profileIndex = profile.findIndex((profile) => profile.id === addressID);
  //   // if (profileIndex === -1) return false;
  //   // profile.splice(profileIndex, 1);
  //   return true;
  // }

  listAddress(userID) {
    console.log(profile);
    return profile.filter((profile) => profile.userID === userID);
  }

  listSingleAddress(userID, addressID) {
    return profile.filter((profile) => profile.userID === userID && profile.id === addressID );
  }



}

module.exports = ProfileService;
