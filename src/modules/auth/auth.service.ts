import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    // Check if user exists
    console.log("USERNAME: ", username)
    console.log("PASSWORD: ", pass)
    const user = await this.usersService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // Password do not match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async create(user) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
   
    const newUser = await this.usersService.create({ ...user, password: pass });
    console.log('user: ', newUser);
    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser['dataValues'];
    console.log('DONE');
    // generate token
    const token = await this.generateToken(result);

    // return the user and the token
    return { user: result, token };
  }

  async login(user: any) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
}
