/* eslint-disable prettier/prettier */
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";


import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email or password incorrect!")
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("email or password incorrect!");
    }
    const token = sign({}, "b7f206382ad65c63aefaa6887e358a5f", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn
  }
}
export { AuthenticateUserUseCase };