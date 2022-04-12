import { IsString, MaxLength, MinLength } from "class-validator"

export class authcreadentiontialDto{
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    username:string

    @IsString()
    @MinLength(8)
    @MaxLength(12)
    password:string
}