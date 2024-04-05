
const ProfileService = require('./profile.service');
const profileService = new ProfileService();
const { GenericException } = require("../generic-exception.js");

class ProfileController {
    addAddress(req, res) {
        const { userID } = req.params;
        const {id, street, city, state , country_id } = req.body;
        const Profile = profileService.addAddress(userID, id, street, city, state , country_id);
        res.json(Profile);
    }

    updateAddress(req, res) {
        const { userID, address_id } = req.params;
        const { street, city, state , country_id } = req.body;
        const updatedProfile = profileService.update(userID, address_id,street, city, state , country_id);
        if(!updatedProfile) return res.status(404).send('Profile not found');
        res.status(200).json(updatedProfile);
    }

    listAddress(req, res) {
        const { userID } = req.params;
        const Profiles = profileService.listAddress(userID);
        res.json(Profiles);
    }

    listSingleAddress(req, res) {
        const { userID,address_id } = req.params;
        const Profiles = profileService.listSingleAddress(userID,address_id);
        res.json(Profiles);
    }

    // getProfileById(req, res) {
    //     const { id } = req.params;
    //     const Profile = profileService.findOne(id);

    //     if(!Profile) {
    //         return res.status(404).send('register not found');
    //     }
    //     res.json(Profile);
    // }


    removeAddress(req, res) {
        console.log("REMOVEAddress"); 
        const { id } = req.params;
        const result = profileService.removeAddress(id);
        if(!result) return res.status(404).send('Profile not found');
        res.status(204).send();
    }
}

module.exports = ProfileController;
