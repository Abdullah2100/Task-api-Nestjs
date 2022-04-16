import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authcreadentiontialDto } from './dto/auth.creadentiona.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPaylad } from './dto/jwt-paylod.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService:JwtService
    ) { }

    async createUser(authcreadentiontialDto: authcreadentiontialDto): Promise<void> {
        const { username, password } = authcreadentiontialDto

        const salt= await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt)
        
        const user = {
            username, password:passwordHash
        }
        await this.userRepository.save(user)

    }

    async singIn(authcreadentiontialDto:authcreadentiontialDto):Promise<{jwtToken:string}>{
        const {password,username}=authcreadentiontialDto
        const user=await this.userRepository.findOne({where:{username:username}})
        if(user&&(await bcrypt.compare(password,user.password))){
            const payload:JwtPaylad={username}
            const jwtToken:string =await this.jwtService.sign(payload)
            return {jwtToken};
        }
        throw new UnauthorizedException("please chack login creadentioal")
    }
}
