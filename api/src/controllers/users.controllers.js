import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  const { page, deleted, admin } = req.query;
  try {
    const usersDB = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: "favorites"
    });
    let users = usersDB;
    if (typeof deleted === "boolean" && deleted) {
      users = users.filter((u) => u.deletionDate === null);
    }

    if (typeof admin === "boolean" && admin) {
      users = users.filter((u) => u.is_admin === true);
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
      include: "favorites"
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
    res.send(`the user ${id} was successfully deleted`);
  } catch (error) {
    res.status(404).send(`Error, route <Delete, deleteUser>: ${error}`);
  }
};

export const postUser = async (req, res) => {
  const bodyUser = req.body;
  try {
    const createdUser = await User.findOrCreate({
      where: {
        email: bodyUser.email,
      },
      defaults: {
        username: bodyUser.username,
        firstname: bodyUser.firstname,
        lastname: bodyUser.lastname,
        picture: bodyUser.picture || "https://imgur.com/EyEFL9w.png",
        date_of_birth: bodyUser.date_of_birth,
        email: bodyUser.email,
        password: bodyUser.password,
        phone: bodyUser.phone,
        active: true,
      },
    });
    if (!createdUser[1]) {
      return res
        .status(400)
        .send(`Error, route <Post, PostUser>: This user already exists`);
    }

    res.status(201).send(createdUser[0]);
  } catch (error) {
    res.status(404).send(`Error, route <Add, PostUser>: ${error}`);
  }
};

export const updateUser = async (req, res) => {
  const bodyUser = req.body;
  try {
    const updatedUser = await User.update(bodyUser, {
        where: {
            id: bodyUser.id
        }
    });
    if(Number(updatedUser) === 0) { return res.status(400).send(`Error, route <Put, UpdateUser>: Could not modify this user ${bodyUser.id}`); }
    res.send(await User.findByPk(bodyUser.id));
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
      { is_admin: (admin === undefined) ? !user?.get().is_admin : admin },
      {
        where: {
          id,
        },
      }
    );
    res.send(await User.findByPk(id));
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
      { active: (status === undefined) ? !user?.get().active : status },
      {
        where: {
          id,
        },
      }
    );
    res.send(await User.findByPk(id));
  } catch (error) {
    res.status(404).send(`Error, route <Patch, PatchStatusUser>: ${error}`);
  }
};
