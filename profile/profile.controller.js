
const ProfileService = require('./Profile.service');
const ProfileService = new ProfileService();
const { GenericException } = require("../generic-exception.js");

class ProfileController {
    addAddress(req, res) {
        const { id, email, password } = req.body;
        const Profile = ProfileService.create(id, email, password);
        res.json(Profile);
    }

    getAllProfiles(req, res) {
        const Profiles = ProfileService.findAll();
        res.json(Profiles);
    }

    getProfileById(req, res) {
        const { id } = req.params;
        const Profile = ProfileService.findOne(id);

        if(!Profile) {
            return res.status(404).send('register not found');
        }
        res.json(Profile);
    }

    updateProfile(req, res) {
        const { id } = req.params;
        const { email, password } = req.body;
        const updatedProfile = ProfileService.update(id, email, password);
        if(!updatedProfile) return res.status(404).send('Profile not found');
        res.status(200).json(updatedProfile);
    }

    deleteProfile(req, res) {
        const { id } = req.params;
        const result = ProfileService.remove(id);
        if(!result) return res.status(404).send('Profile not found');
        res.status(204).send();
    }
}

module.exports = ProfileController;
