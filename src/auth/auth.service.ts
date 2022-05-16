import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  ): Promise<{ accessToken: string ,userId:string}> {
    const { username, password } = authCredentialsDto;
    const user:User = await this.usersRepository.findOne({ username });
    const userId=user.id.toString()
    console.log(userId)
    if (user && (await bcrypt.compare(password, user.password))) {
      
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload.username,{
        secret:this.config.get('JWT_SECRET'),
        expiresIn: 60
      });
     
     
      return { accessToken , userId };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  async getRefreshToeknf(refrechToken:RefrechToken):Promise<{refrechsTokens:string}>{
    const {id}=refrechToken;
    const userr:User=await this.usersRepository.findOne({ where:{id:id} })
    if(userr!=null){
    const refrechsTokens:string=await this.jwtService.sign(userr.username,{
      expiresIn: 604800
    });
    return {refrechsTokens}
    }else{
      throw new UnauthorizedException('Please login');
    }
  }
}
