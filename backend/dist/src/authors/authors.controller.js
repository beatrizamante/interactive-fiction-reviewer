var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { AuthorsService } from './authors.service.js';
let AuthorsController = class AuthorsController {
    authorsService;
    constructor(authorsService) {
        this.authorsService = authorsService;
    }
    create(fictionId, dto, user) {
        return this.authorsService.create(fictionId, dto, user.sub);
    }
    findAll(fictionId) {
        return this.authorsService.findAll(fictionId);
    }
    remove(fictionId, id, user) {
        return this.authorsService.remove(fictionId, id, user.sub);
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    Post(),
    __param(0, Param('fictionId', ParseIntPipe)),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateAuthorDto, Object]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Param('fictionId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "findAll", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':id'),
    __param(0, Param('fictionId', ParseIntPipe)),
    __param(1, Param('id', ParseIntPipe)),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], AuthorsController.prototype, "remove", null);
AuthorsController = __decorate([
    Controller('fictions/:fictionId/authors'),
    __metadata("design:paramtypes", [AuthorsService])
], AuthorsController);
export { AuthorsController };
//# sourceMappingURL=authors.controller.js.map