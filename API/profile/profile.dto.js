class ProfileDTO {
    constructor({id, userID, street, city, state , country_id }) {
        this.id = id;
        this.userID = userID;
        this.street = street;
        this.city = city;
        this.state = state;
        this.country_id = country_id;
    }
}

module.exports = ProfileDTO;
