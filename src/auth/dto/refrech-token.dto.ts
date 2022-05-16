import { isError } from "@hapi/joi";
import { IsEmpty, IsNotEmpty, IsString} from "class-validator";
import { Interface } from "readline";

export class RefrechToken{
@IsString()
@IsNotEmpty()
id:string


}