import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { JwtPaylad } from "./jwt-paylod.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private configService: ConfigService,
    ){
        super({
        secretOrKey:configService.get('JWT_SECRET'),
       
           jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(), //the doc migratin fom 2.x to 3.x using jwt you should use  //ExtractJwt.fromAuthHeaderWithScheme('jwt')
        });
    }
    async validate(payload:JwtPaylad): Promise<User>{
        const {username}=payload;
        const user=await this.userRepository.findOne({where:{username:username}})
        if(!user){
            throw new NotFoundException();
        }
        return user;
    }
}

