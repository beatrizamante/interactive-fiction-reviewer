import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { AuthorsService } from './authors.service.js';

@Controller('fictions/:fictionId/authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Body() dto: CreateAuthorDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.authorsService.create(fictionId, dto, user.sub);
  }

  @Get()
  findAll(@Param('fictionId', ParseIntPipe) fictionId: number) {
    return this.authorsService.findAll(fictionId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.authorsService.remove(fictionId, id, user.sub);
  }
}
