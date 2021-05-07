const axios = require("axios");
const { UserRole} = require("../../../../models");


const UserRoleController = {
  async getAll(req, res) {
    const userRoles = await UserRole.findAll();
    
    res.json(userRoles);
  },
  
};
module.exports = UserRoleController;
