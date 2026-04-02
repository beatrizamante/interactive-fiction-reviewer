var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AuthorsService = class AuthorsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(fictionId, dto, userId) {
        const fiction = await this.prisma.fiction.findUnique({
            where: { id: fictionId },
        });
        if (!fiction) {
            throw new NotFoundException('Ficção não encontrada');
        }
        if (fiction.authorId !== userId) {
            throw new ForbiddenException('Apenas o autor da ficção pode vincular escritores');
        }
        return this.prisma.author.create({
            data: {
                name: dto.name,
                role: dto.role,
                fictionId,
            },
        });
    }
    async findAll(fictionId) {
        const fiction = await this.prisma.fiction.findUnique({
            where: { id: fictionId },
        });
        if (!fiction) {
            throw new NotFoundException('Ficção não encontrada');
        }
        return this.prisma.author.findMany({
            where: { fictionId },
        });
    }
    async remove(fictionId, id, userId) {
        const fiction = await this.prisma.fiction.findUnique({
            where: { id: fictionId },
        });
        if (!fiction) {
            throw new NotFoundException('Ficção não encontrada');
        }
        if (fiction.authorId !== userId) {
            throw new ForbiddenException('Apenas o autor da ficção pode remover escritores');
        }
        const author = await this.prisma.author.findFirst({
            where: { id, fictionId },
        });
        if (!author) {
            throw new NotFoundException('Escritor não encontrado');
        }
        return this.prisma.author.delete({ where: { id } });
    }
};
AuthorsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AuthorsService);
export { AuthorsService };
//# sourceMappingURL=authors.service.js.map