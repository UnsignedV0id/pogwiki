class PageDTO {
    constructor({id, state, admID, createdBy, content , title, tags}) {
        this.id = id;
        this.state = state;
        this.approvedBy = admID;
        this.createdBy = createdBy;
        this.content = content;
        this.title = title;
        this.tags = tags;
    }
}

module.exports = PageDTO;
