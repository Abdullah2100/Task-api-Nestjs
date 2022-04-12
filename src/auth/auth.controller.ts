import { Body, Controller, Post } from '@nestjs/common';
import { authcreadentiontialDto } from 'src/tasks/taskdto/auth.creadentiona.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  singnUp(@Body() authcreadentiontialDto: authcreadentiontialDto): Promise<void> {
    return this.authService.createUser(authcreadentiontialDto);
  }
}
