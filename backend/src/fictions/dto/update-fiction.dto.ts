import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class UpdateFictionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  @IsOptional()
  publishedAt?: number;

  @IsString()
  @IsNotEmpty()
  link?: string;
}
