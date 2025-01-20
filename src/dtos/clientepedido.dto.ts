import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ClienteDTO{
    @IsString()
    @ApiProperty()
    fechaA:string;
    
    @IsString()
    @ApiProperty()
    fechaB:string;
}