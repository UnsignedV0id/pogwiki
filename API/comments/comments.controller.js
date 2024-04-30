
const CommentsService = require('./comments.service');
const commentsService = new CommentsService();
const { GenericException } = require("../generic-exception.js");

class CommentsController {
    addComments(req, res) {
        const {page, createdBy, content} = req.body;
        const Comments = commentsService.addComments(page, createdBy, content);
        res.json(Comments);
    }

    // updateComments(req, res) {
    //     const { userID, Comments_id } = req.params;
    //     const { street, city, state , country_id } = req.body;
    //     const updatedComments = CommentsService.update(userID, Comments_id,street, city, state , country_id);
    //     if(!updatedComments) return res.status(404).send('Comments not found');
    //     res.status(200).json(updatedComments);
    // }

    // listComments(req, res) {
    //     const { userID } = req.params;
    //     const Commentss = CommentsService.listComments(userID);
    //     res.json(Commentss);
    // }

    // listSingleComments(req, res) {
    //     const { userID,Comments_id } = req.params;
    //     const Commentss = CommentsService.listSingleComments(userID,Comments_id);
    //     res.json(Commentss);
    // }

    // removeComments(req, res) {
    //     console.log("REMOVEComments"); 
    //     const { id } = req.params;
    //     const result = CommentsService.removeComments(id);
    //     if(!result) return res.status(404).send('Comments not found');
    //     res.status(204).send();
    // }
}

module.exports = CommentsController;
