const { v4: uuidv4 } = require("uuid");
const User = require("./user.entity.js");
const UserDTO = require("./user.dto.js");
const { GenericException } = require("../generic-exception.js");

const users = [
  {
    id: uuidv4(),
    email: "teste@teste.com",
    password: "123456",
  },
  {
    id: uuidv4(),
    email: "teste@2teste.com",
    password: "123456",
  },
  {
    id: "1",
    email: "wow",
    password: "123",
  },
];

class UserService {
  login(user_email, user_password){
    const usuario = users.find((user) => user.email === user_email)
    if (usuario  <=  -1) { return false}
      console.log(usuario);
    if (usuario.password === user_password) {return true}
    else {return false}
  }

  findOne(id) {
    return users.find((user) => user.id === id);
  }

  findAll() {
    console.log(users);
    return users.map((user) => new UserDTO(user));
  }

  create(id, email, password) {
    id = uuidv4();
    const newUser = new User(id, email, password);
    console.log(newUser)
    users.push(newUser);
    return newUser;
  }

  update(id, email, password) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    const updatedUser = { id, email, password };
    users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }
}

module.exports = UserService;
