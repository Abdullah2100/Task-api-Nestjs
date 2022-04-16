import { Body, Controller, Get, Post } from '@nestjs/common';
import { retryWhen } from 'rxjs';
import {authcreadentiontialDto} from './dto/auth.creadentiona.dto'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  singnUp(@Body() authcreadentiontialDto: authcreadentiontialDto): Promise<void> {
    return this.authService.createUser(authcreadentiontialDto);
  }

  @Post('/signIn')
  signIn(@Body()authcreadentiontialDto:authcreadentiontialDto):Promise<{jwtToken:string}>{
    return this.authService.singIn(authcreadentiontialDto);
  }
}
