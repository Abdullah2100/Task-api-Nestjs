import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class GetDtoTaskFilter{
    @IsOptional()
    @IsBoolean()
    status?:boolean;
    @IsOptional()
    @IsString()
    search?:string;
}