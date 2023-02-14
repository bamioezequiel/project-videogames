import { model, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    name: {
      required: true,
      type: String,
    },
    lastname: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    picture: {
      type: String,
      default: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
    role: {
      required: true,
      type: String,
      default: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("users", UserSchema);
export default UserModel;