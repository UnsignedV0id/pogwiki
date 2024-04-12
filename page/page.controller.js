
const PageService = require('./page.service');
const pageService = new PageService();
const { GenericException } = require("../generic-exception.js");

class PageController {
    addPage(req, res) {
        const {createdBy, content, title, tags } = req.body;
        const Page = pageService.addPage(createdBy, content, title, tags);
        res.json(Page);
    }

    // updatePage(req, res) {
    //     const { userID, Page_id } = req.params;
    //     const { street, city, state , country_id } = req.body;
    //     const updatedPage = PageService.update(userID, Page_id,street, city, state , country_id);
    //     if(!updatedPage) return res.status(404).send('Page not found');
    //     res.status(200).json(updatedPage);
    // }

    // listPage(req, res) {
    //     const { userID } = req.params;
    //     const Pages = PageService.listPage(userID);
    //     res.json(Pages);
    // }

    // listSinglePage(req, res) {
    //     const { userID,Page_id } = req.params;
    //     const Pages = PageService.listSinglePage(userID,Page_id);
    //     res.json(Pages);
    // }

    // removePage(req, res) {
    //     console.log("REMOVEPage"); 
    //     const { id } = req.params;
    //     const result = PageService.removePage(id);
    //     if(!result) return res.status(404).send('Page not found');
    //     res.status(204).send();
    // }
}

module.exports = PageController;
