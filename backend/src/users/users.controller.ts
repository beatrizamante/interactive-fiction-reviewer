import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-users.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { UsersService } from './users.service.js';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.usersService.findMe(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.sub, dto);
  }
}
