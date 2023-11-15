"use strict";

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Role } = require("../../app/models");

const names = ["Johnny", "Fikri", "Brian", "Ranggawarsita", "Jayabaya"];

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123456";
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    const role = await Role.findOne({
      where: {
        name: "ADMIN",
      },
    });

    const usersCustomer = {
      name: "Jojo",
      email: "jojo@binar.co.id",
      encryptedPassword,
      roleId: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    let users = names.map((name) => ({
      name,
      email: `${name.toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    users = [...users, usersCustomer];


    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { name: { [Op.in]: names } }, {});
  },
};
