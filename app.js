// app.js
const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("./user/user.controller.js");
const ProfileController = require("./profile/profile.controller.js");

const app = express();
const port = 3000;

app.use(bodyParser.json()); // Para parsing de application/json


// Rotas para o CRUD de Usuário

/* #region  User */
const userController = new UserController();
app.post("/users", (req, res) => userController.createUser(req, res));
app.get("/users", (req, res) => userController.getAllUsers(req, res));
app.get("/users/:id", (req, res) => userController.getUserById(req, res));
app.put("/users/:id", (req, res) => userController.updateUser(req, res));
app.delete("/users/:id", (req, res) => userController.deleteUser(req, res));
app.post("/users/login", (req, res) => userController.login(req, res));

/* #endregion */

/* #region  Profile */
const profileController = new ProfileController();
app.post("/:userID/addresses", (req, res) => profileController.addAddress(req, res));
// app.delete("/:id/addresses/:address_id", (req, res) => profileController.removeAddress(req, res));
app.get("/:userID/addresses", (req, res) => profileController.listAddress(req, res));
app.get("/:userID/addresses/:address_id", (req, res) => profileController.listSingleAddress(req, res));
app.put("/:userID/addresses/:address_id", (req, res) => profileController.updateAddress(req, res));
/* #endregion */



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
