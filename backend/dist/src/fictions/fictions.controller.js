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
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe, UseGuards, } from '@nestjs/common';
import { CreateFictionDto } from './dto/create-fiction.dto.js';
import { UpdateFictionDto } from './dto/update-fiction.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { FictionsService } from './fictions.service.js';
let FictionsController = class FictionsController {
    fictionService;
    constructor(fictionService) {
        this.fictionService = fictionService;
    }
    create(dto, user) {
        return this.fictionService.create(dto, user.sub);
    }
    findAll(page, limit) {
        return this.fictionService.findAll(page ? parseInt(page, 10) : 1, limit ? parseInt(limit, 10) : 10);
    }
    findOne(id) {
        return this.fictionService.findOne(id);
    }
    update(id, dto, user) {
        return this.fictionService.update(id, dto, user.sub);
    }
    remove(id, user) {
        return this.fictionService.remove(id, user.sub);
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    Post(),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateFictionDto, Object]),
    __metadata("design:returntype", void 0)
], FictionsController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query('page')),
    __param(1, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FictionsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FictionsController.prototype, "findOne", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateFictionDto, Object]),
    __metadata("design:returntype", void 0)
], FictionsController.prototype, "update", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], FictionsController.prototype, "remove", null);
FictionsController = __decorate([
    Controller('fiction'),
    __metadata("design:paramtypes", [FictionsService])
], FictionsController);
export { FictionsController };
//# sourceMappingURL=fictions.controller.js.map