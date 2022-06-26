import { isNotEmpty, IsString } from "class-validator";

export class RefreshTokkenDto{
@IsString()
id:String
}