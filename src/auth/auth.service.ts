import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { RefreshTokkenDto } from './dto/regresh-token.dto';

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
  ): Promise<{accessToken: string,id:string }> {
  
    const { username, password,devicePlatform } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });
     const id=user.id
   
    if (user && (await bcrypt.compare(password, user.password))) {
      
      const payload: JwtPayload = { username };
  
     
     if(devicePlatform==="Android"){
      const accessToken: string = await this.jwtService.sign(payload,{
        secret:this.config.get('JWT_SECRET'),
        
      });
      return {  accessToken,id};
     }
     else{
      const accessToken: string = await this.jwtService.sign(payload,{
        secret:this.config.get('JWT_SECRET'),
        expiresIn:60*60
      });
      return {  accessToken,id };
     }
     
    } else {
      throw new UnauthorizedException('Please check your login credentials');
     
    }
  }


  async refreshToken(refreshToken:RefreshTokkenDto):Promise<{refreshToken:string}>{
    const {id}=refreshToken
    let findone= await this.usersRepository.find({where:{id}})
    if(findone){
      const jwtRefreshPaylod={id}
      const refreshToken=await this.jwtService.sign(jwtRefreshPaylod,{
        secret:this.config.get('JWT_SECRET'),
        expiresIn:60*60*24*7
      })
      return {refreshToken}
    }
  }
}
