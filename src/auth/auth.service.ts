import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authcreadentiontialDto } from 'src/tasks/taskdto/auth.creadentiona.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async createUser(authcreadentiontialDto: authcreadentiontialDto): Promise<void> {
        const { username, password } = authcreadentiontialDto

        const salt= await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt)
        console.log(salt)
        console.log(passwordHash)
        const user = {
            username, password:passwordHash
        }
        await this.userRepository.save(user)

    }
}
