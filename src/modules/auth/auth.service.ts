import * as bcrypt from 'bcrypt';
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

interface IJWTPayload {
  id: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    // Check if user exists
    const user = await this.usersService.findOneByEmail(email);
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

  async login({email, password}: {email: string, password: string}) {

    const validateUser = await this.validateUser(email, password);

    if(validateUser === null){
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }
    const token = await this.generateToken(validateUser.id);
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

  private async generateToken(id) { 
    return await this.jwtService.signAsync({id});
  }
}
