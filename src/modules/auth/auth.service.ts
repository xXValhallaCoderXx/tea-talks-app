import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
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
    const user = await this.usersService.findOneByEmail("renate@gmail.com");
    if (!user) {
      return null;
    }

    // Password do not match
    const match = await this.comparePassword("123456", user.password);
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

  async login({email, password}: {email: string, password: string}) {

    const token = await this.generateToken({email, password});
    return { user: {email}, token };
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async generateToken({email, password}) { 
    return await this.jwtService.signAsync({email, password});
  }
}
