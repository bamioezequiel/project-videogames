import { User } from "./../models/User.js";
import { Cart } from "./../models/Cart.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const giveAdmin = async (req, res) => {
  const userId = req.params.id;
  const token = req.headers.token;
  try {
    jwt.verify(token, "secret", async function (err, { id, email, rol }) {
      if (err) return res.send(false);
      const owner = await User.findOne({
        where: {
          id,
          email,
          rol,
        },
      });
      if (owner && owner.rol === "Owner") {
        const user = await User.findByPk(userId);
        if (!user) return res.send(false);
        else if (user.rol === "User") {
          user.rol = "Admin";
          await user.save();
        }
        return res.status(200).send(`${user.firstname} is now Admin.`);
      }
      res.status(400).send("You are not logged in or you are not an admin");
    });
  } catch (error) {
    res.status(404).send("You are not logged in or you are not an admin");
  }
};

export const removeAdmin = async (req, res) => {
  const userId = req.params.id;
  const token = req.headers.token;
  try {
    jwt.verify(token, "secret", async function (err, { id, email, rol }) {
      if (err) return res.send(false);
      const owner = await User.findOne({
        where: {
          id,
          email,
          rol,
        },
      });
      if (owner && owner.rol === "Owner") {
        const admin = await User.findByPk(userId);
        if (!admin) return res.send(false);
        else if (admin.rol === "Admin") {
          admin.rol = "User";
          await admin.save();
        }
        return res.status(200).send(`${admin.firstname} is now Admin.`);
      }
      res.status(400).send("You are not logged in or you are not an admin");
    });
  } catch (error) {
    res.status(404).send("You are not logged in or you are not an admin");
  }
};

export const validateUser = async (req, res) => {
  const token = req.headers.token;
  const userBody = req.body;
  try {
    jwt.verify(token, "secret", async function (err, { id, email, rol }) {
      if (err) return res.send(false);

      const user = await User.findOne({
        where: {
          id,
          email,
          rol,
        },
        include: "favorites",
      });
      if (!user) return res.send(false);
      if (
        userBody.id === user.id &&
        userBody.email === user.email &&
        userBody.rol === user.rol &&
        userBody.favorites?.length === user.favorites?.length
      ) {
        return res.send(true);
      }

      res.send(false);
    });
  } catch (error) {
    res.status(404).send(false);
  }
};

export const status = async (req, res) => {
  const token = req.headers.token;
  try {
    jwt.verify(token, 'secret');
  } catch(error) {
    return res.status(400).send('token expired');
  }
  try {
    jwt.verify(token, "secret", async function (err, { id, email }) {
      if (err) return res.status(400).send(false);
      
      const user = await User.findOne({
        where: {
          id,
          email,
        },
      });
      if (!user) return res.status(400).send(false);
      res.send(user);
    });
  } catch (error) {
    res.status(404).send(false);
  }
};

export const register = async (req, res) => {
  const bodyUser = req.body;
  try {
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
      },
    });
    if (!createdUser[1]) {
      return res
        .status(400)
        .send(
          `Error, route <Register, RegisterUser>: This user already exists`
        );
    }

    await Cart.create({
      status: "Vacio",
      userId: createdUser[0].dataValues.id,
    });

    const jwtToken = jwt.sign(
      {
        id: createdUser[0].dataValues.id,
        email: createdUser[0].dataValues.email,
        rol: createdUser[0].dataValues.rol,
      },
      "secret",
      { expiresIn: "1h" }
    );

    res.status(201).send({
      token: jwtToken,
      user: createdUser[0],
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(`Error, route <Register, RegisterUser>: ${error}`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) return res.status(400).send("User not found");
    else if (user.password !== hashedPassword) {
      return res.status(400).send("Password does not match!");
    } else {
      const jwtToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          rol: user.rol,
        },
        "secret",
        { expiresIn: "12h" }
      );
      res.status(200).json({
        token: jwtToken,
        user,
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
