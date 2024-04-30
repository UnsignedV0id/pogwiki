const { v4: uuidv4 } = require("uuid");
const Page = require("./page.entity.js");
const PageDTO = require("./page.dto.js");
const { GenericException } = require("../generic-exception.js");

const page = [
  // {
  //   id: "1",
  //   userID: "1",
  //   street : "Street 45",
  //   city : "San Andreas",
  //   state : "Los Angeles",
  //   country_id : "1",
  // }
  // {
  //   id: uuidv4(),
  //   userID: 
  //   street : "Stret 50",
  //   city : "Vice city",
  //   state : "Los Angeles",
  //   country_id : 1,
  // },
];

class PageService {
  addPage(createdBy, content, title, tags) {
    let id = uuidv4();
    let state = "new";
    let admID = "SuperUser"
    const newPage = new Page(id, state, admID, createdBy, content , title, tags);
    console.log("newPage: \n");
    console.log(newPage);
    page.push(newPage);
    return newPage;
  }

  // updatePage(userID, Page_id, street, city, state , country_id) {
  //   const PageIndex = Page.findIndex((Page) => Page.id === Page_id && Page.userID === userID );
  //   if (PageIndex === -1) return null;
  //   const updatedPage = { street, city, state , country_id };
  //   Page[PageIndex] = updatedPage;
  //   return updatedPage;
  // }

  // // removePage(PageID) {
  // //   console.log(1)
  // //   // const PageIndex = Page.findIndex((Page) => Page.id === PageID);
  // //   // if (PageIndex === -1) return false;
  // //   // Page.splice(PageIndex, 1);
  // //   return true;
  // // }

  // listPage(userID) {
  //   console.log(Page);
  //   return Page.filter((Page) => Page.userID === userID);
  // }

  // listSinglePage(userID, PageID) {
  //   return Page.filter((Page) => Page.userID === userID && Page.id === PageID );
  // }
;

}

module.exports = PageService;
