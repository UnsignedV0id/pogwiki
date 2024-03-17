
const ProfileService = require('./profile.service');
const profileService = new ProfileService();
const { GenericException } = require("../generic-exception.js");

class ProfileController {
    // addAddress(req, res) {
    //     console.log("caiu");
        // const { userID } = req.params;
        // const {id, street, city, state , country_id } = req.body;
        // console.log(userID);
        // const Profile = profileService.create(userID, id, street, city, state , country_id);
        // res.json(Profile);
    // }

    listAddress(req, res) {
        console.log("listAddress");
        const { id } = req.params;
        const Profiles = profileService.listAddress(id);
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

    // updateProfile(req, res) {
    //     const { id } = req.params;
    //     const { email, password } = req.body;
    //     const updatedProfile = profileService.update(id, email, password);
    //     if(!updatedProfile) return res.status(404).send('Profile not found');
    //     res.status(200).json(updatedProfile);
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
