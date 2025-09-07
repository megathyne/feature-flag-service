import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetFeatureToggleDto {
    @ApiProperty({ description: 'The kind of context' })
    @IsString()
    @IsNotEmpty()
    kind: string;

    @ApiProperty({ description: 'The key of the context' })
    @IsString()
    @IsNotEmpty()
    key: string;
    
    @ApiProperty({ description: 'The name of the context' })
    @IsString()
    @IsNotEmpty()
    name: string;
}