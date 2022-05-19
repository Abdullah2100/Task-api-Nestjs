import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { retry } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefrechToken } from './dto/refrech-token.dto';
import { RefrechTokenStrategy } from './stratigy/refrechToken.strategy';

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
  ): Promise<{ userId:string,accessToken: string,usernamee:string}> {
   
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/refToken')
  @UseGuards(RefrechTokenStrategy)
  getRefreshToekn(
    @Body()refrechToken:RefrechToken
    ):Promise<{refrechsTokens:string,}>{
      return this.authService.getRefreshToeknf(refrechToken)
  }
 
}