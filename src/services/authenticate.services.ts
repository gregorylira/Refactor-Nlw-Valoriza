import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { userRepositoy } from "../repositories/repositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    //verificar se o email existe
    const user = await userRepositoy.findOneBy({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // verificar se senha esta correta

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    //gerar token
    const id = String(user.id);

    const token = sign(
      {
        email: user.email,
      },
      "25de3244523913ea707fcece5bbc92c8",
      {
        subject: id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
