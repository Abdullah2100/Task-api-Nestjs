import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { RefrechToken } from './dto/refrech-token.dto';
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
  ): Promise<{ userId:string,accessToken: string ,usernamee:string}> {
    // ): Promise<{ userId:string,accessToken:string}> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });
   
   
    if (user && (await bcrypt.compare(password, user.password))) {
      var userId=user.id
      var usernamee=user.username
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload,{
        secret:this.config.get('JWT_SECRET'),
        expiresIn: 60
      });
     
     
      return { userId , accessToken , usernamee};
      // return { userId , accessToken };
      // return user.id
    } else {
      throw new UnauthorizedException('Please check your login credentials');
     
    }
  }
  async getRefreshToeknf(refrechToken:RefrechToken):Promise<{refrechsTokens:string}>{
    const {id,username}=refrechToken;
    // const {id}=refrechToken;
    const userr=await this.usersRepository.findOne({ id })
    const userIdd={id}
    const payload: JwtPayload = { username };
    if(userr!=null){
      // const payload: JwtPayload = { usernaee };
    const refrechsTokens:string=await this.jwtService.sign(payload,{
      secret:this.config.get('JWT_SECRET'),
      expiresIn: 604800
    });
    return {refrechsTokens}
    }else{
      throw new UnauthorizedException('Please login');
    }
  }
}
