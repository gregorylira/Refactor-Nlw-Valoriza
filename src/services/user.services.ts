import { User } from "../entities/User";
import { IUser } from "../models/user.model";
import { userRepositoy } from "../repositories/repositories";
import { compare, hash } from "bcryptjs";
import { classToPlain } from "class-transformer";

export class UserServices {
  async createUser({ name, admin = false, email, password, image_url }: IUser) {
    try {
      const passwordHash = await hash(password, 8);
      const user = {
        name,
        admin,
        email,
        image_url,
        password: passwordHash,
      };
      const alreadyExists = await userRepositoy.findOneBy({ email });
      if (alreadyExists) {
        throw new Error("user already exists");
      }

      const newUser = userRepositoy.create(user);
      await userRepositoy.save(newUser);

      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  async listUsers() {
    try {
      const users = await userRepositoy.find();
      return classToPlain(users);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser({ email, password }: IUser) {
    try {
      const userCaght = await userRepositoy.findOneBy({ email });
      if (!userCaght) {
        throw new Error("user not found");
      }

      const passwordMatch = await compare(password, userCaght.password);

      if (!passwordMatch) {
        throw new Error("Email/password incorrect");
      }

      await userRepositoy.delete({ email });

      const message = {
        message: "User has been deleted",
      };
      return message;
    } catch (err) {
      throw new Error(err);
    }
  }

  async modifyUser({ id, name, email, password }: IUser) {
    try {
      const user = await userRepositoy.findOneBy({ id });
      if (!user) {
        throw new Error("User not found");
      }

      const passwordHash = await hash(password, 8);

      user.name = name;
      user.email = email;
      user.password = passwordHash;
      await userRepositoy.save(user);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
