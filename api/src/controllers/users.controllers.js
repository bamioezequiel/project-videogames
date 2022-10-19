import { User } from "../models/User.js";
import { Cart } from "./../models/Cart.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const getUsers = async (req, res) => {
  const { page, deleted, admin } = req.query;
  try {
    const usersDB = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: "favorites",
    });
    let users = usersDB;
    if (typeof deleted === "boolean" && deleted) {
      users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
        include: "favorites",
        paranoid: false,
      });
    }

    if (typeof admin === "boolean" && admin) {
      users = users.filter((u) => u.rol === "Admin" || u.rol === "Owner");
    }

    res.send(users);
  } catch (error) {
    res.status(404).send(`Error, route <Get, GetUsers>: ${error}`);
  }
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password"],
      },
      include: "favorites",
    });
    res.send(user);
  } catch (error) {
    res.status(404).send(`Error, route <Get, getUserByID>: ${error}`);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    const user = User.findByPk(id);
    user.active = false;
    user.save();
    res.send(`the user ${id} was successfully deleted`);
  } catch (error) {
    res.status(404).send(`Error, route <Delete, deleteUser>: ${error}`);
  }
};

export const updateUser = async (req, res) => {
  const bodyUser = req.body;
  try {
    const updatedUser = await User.update(bodyUser, {
      where: {
        id: bodyUser.id,
      },
    });
    if (Number(updatedUser) === 0) {
      return res
        .status(400)
        .send(
          `Error, route <Put, UpdateUser>: Could not modify this user ${bodyUser.id}`
        );
    }
    res.send(
      await User.findOne({
        where: {
          id: bodyUser.id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: "favorites",
      })
    );
  } catch (error) {
    res.status(404).send(`Error, route <Put, UpdateUser>: ${error}`);
  }
};

export const restoreUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.restore({
      where: {
        id,
      },
    });
    const user = User.findByPk(id);
    user.active = true;
    user.save();
    res.send(`the user ${id} was successfully restored`);
  } catch (error) {
    res.status(404).send(`Error, route <Patch, RestoreUser>: ${error}`);
  }
};

export const patchAdminUser = async (req, res) => {
  const { id } = req.params;
  const { admin } = req.query;
  try {
    const user = await User.findByPk(id);
    await User.update(
      { is_admin: admin === undefined ? !user?.get().is_admin : admin },
      {
        where: {
          id,
        },
      }
    );
    res.send(
      await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: "favorites",
      })
    );
  } catch (error) {
    res.status(404).send(`Error, route <Patch, PatchAdminUser>: ${error}`);
  }
};

export const patchStatusUser = async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;
  try {
    const user = await User.findByPk(id);
    await User.update(
      { active: status === undefined ? !user?.get().active : status },
      {
        where: {
          id,
        },
      }
    );
    res.send(
      await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: "favorites",
      })
    );
  } catch (error) {
    res.status(404).send(`Error, route <Patch, PatchStatusUser>: ${error}`);
  }
};

export const loadAdmin = async () => {
  const bodyUser = {
    firstname: "Admin",
    lastname: "Admin",
    picture: "https://imgur.com/EyEFL9w.png",
    date_of_birth: "14-04-2001",
    email: "admin@admin.com",
    password: "Admin123",
    phone: "1234567891",
    active: true,
    rol: "Owner",
  };

  try {
    if (!(await User.findAndCountAll())?.count) {
      console.log("Loading Admin in database...");
      const createdUser = await User.findOrCreate({
        where: {
          email: bodyUser.email,
        },
        defaults: {
          firstname: bodyUser.firstname,
          lastname: bodyUser.lastname,
          picture: bodyUser.picture,
          date_of_birth: bodyUser.date_of_birth,
          email: bodyUser.email,
          password: crypto
            .createHash("md5")
            .update(bodyUser.password)
            .digest("hex"),
          phone: bodyUser.phone,
          active: true,
          rol: bodyUser.rol,
        },
      });

      await Cart.create({
        status: "Empty",
        userId: createdUser[0].dataValues.id,
      });

      console.log("Loading Admin complete.");
    }
  } catch (error) {
    console.log(`Load Data Base: ${error}`);
  }
};
