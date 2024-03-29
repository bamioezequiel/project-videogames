import UserModel from "../models/user.model";

export const updateUser = async (id: string, bodyUser: any) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { ...bodyUser },
    {
      new: true,
    }
  );
  return user;
};

export const changeRoleUser = async (id: string, role: string) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { role },
    {
      new: true,
    }
  );
  return user;
};

export const getUser = async (id: string) => {
  const user: any =  await UserModel.findById(id);

  return {
    _id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    picture: user.picture
  };
}

export const getUsers = async () => {
  const users: any =  await UserModel.find({});

  return users;
}
