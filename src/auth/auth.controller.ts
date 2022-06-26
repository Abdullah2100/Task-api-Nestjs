import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { retry } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, } from './dto/auth-credentials.dto';
import { RefreshTokkenDto } from './dto/regresh-token.dto';
import { refreshTokenGwt } from './refreshtoken.strategy';




@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')

  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string}> {
   
    return this.authService.signIn(authCredentialsDto);
  }


 
}