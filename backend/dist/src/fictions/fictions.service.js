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
let FictionsService = class FictionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, authorId) {
        return this.prisma.fiction.create({
            data: {
                ...dto,
                authorId,
            },
        });
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.fiction.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    author: {
                        select: { id: true, name: true },
                    },
                    authors: true,
                },
            }),
            this.prisma.fiction.count(),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const fiction = await this.prisma.fiction.findUnique({
            where: { id },
            include: {
                author: {
                    select: { id: true, name: true },
                },
                authors: true,
                reviews: {
                    include: {
                        author: { select: { id: true, name: true } },
                    },
                },
            },
        });
        if (!fiction) {
            throw new NotFoundException('Ficção não encontrada');
        }
        return fiction;
    }
    async update(id, dto, userId) {
        const fiction = await this.prisma.fiction.findUnique({
            where: { id },
        });
        if (!fiction) {
            throw new NotFoundException('Ficção não encontrada');
        }
        if (fiction.authorId !== userId) {
            throw new ForbiddenException('Apenas o autor pode editar esta ficção');
        }
        return this.prisma.fiction.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, userId) {
        const fiction = await this.prisma.fiction.findUnique({
            where: { id },
        });
        if (!fiction) {
            throw new NotFoundException('Ficção não encontrada');
        }
        if (fiction.authorId !== userId) {
            throw new ForbiddenException('Apenas o autor pode excluir esta ficção');
        }
        return this.prisma.fiction.delete({ where: { id } });
    }
};
FictionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], FictionsService);
export { FictionsService };
//# sourceMappingURL=fictions.service.js.map