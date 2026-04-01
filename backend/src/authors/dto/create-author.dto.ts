import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsIn(['main_author', 'coauthor', 'collaborator'])
  role!: string;
}
