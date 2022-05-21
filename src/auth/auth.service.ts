import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private config:ConfigService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{accessToken: string }> {
  
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });
   
   
    if (user && (await bcrypt.compare(password, user.password))) {
      
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload,{
        secret:this.config.get('JWT_SECRET'),
        expiresIn: 60*60*3
      });
     
     
      return {  accessToken };
     
    } else {
      throw new UnauthorizedException('Please check your login credentials');
     
    }
  }

}
