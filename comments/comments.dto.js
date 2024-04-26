class CommentsDTO {
    constructor({id, page, state, stateText, createdBy, content }) {
        this.id = id;
        this.page = page;
        this.state = state;
        this.stateText = stateText;
        this.createdBy = createdBy;
        this.content = content;
    }
}

module.exports = CommentsDTO;
