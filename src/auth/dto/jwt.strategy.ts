import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { JwtPaylad } from "./jwt-paylod.interface";

@Injectable()

export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){
        super({
        secretOrKey:'thsisjis@fsdf',
        jwtFormRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    async validate(payload:JwtPaylad){
        const {username}=payload;
        const user=this.userRepository.findOne({where:{username:username}})
        if(!user){
            throw new NotFoundException();
        }
        return user;
    }
}