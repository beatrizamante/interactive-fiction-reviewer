var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ForbiddenException, ConflictException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(fictionId, dto, authorId) {
        const fiction = await this.prisma.fiction.findUnique({
            where: { id: fictionId },
        });
        if (!fiction) {
            throw new NotFoundException('Ficção não encontrada');
        }
        const existing = await this.prisma.review.findUnique({
            where: { fictionId_authorId: { fictionId, authorId } },
        });
        if (existing) {
            throw new ConflictException('Você já avaliou esta ficção');
        }
        return this.prisma.review.create({
            data: {
                ...dto,
                fictionId,
                authorId,
            },
            include: {
                author: { select: { id: true, name: true } },
            },
        });
    }
    async findAll(fictionId, page = 1, limit = 10) {
        const fiction = await this.prisma.fiction.findUnique({
            where: { id: fictionId },
        });
        if (!fiction) {
            throw new NotFoundException('Ficção não encontrada');
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.review.findMany({
                where: { fictionId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    author: { select: { id: true, name: true } },
                },
            }),
            this.prisma.review.count({ where: { fictionId } }),
        ]);
        return { data, total, page, limit };
    }
    async update(fictionId, id, dto, userId) {
        const review = await this.prisma.review.findFirst({
            where: { id, fictionId },
        });
        if (!review) {
            throw new NotFoundException('Avaliação não encontrada');
        }
        if (review.authorId !== userId) {
            throw new ForbiddenException('Apenas o autor pode editar esta avaliação');
        }
        return this.prisma.review.update({
            where: { id },
            data: dto,
            include: {
                author: { select: { id: true, name: true } },
            },
        });
    }
    async remove(fictionId, id, userId) {
        const review = await this.prisma.review.findFirst({
            where: { id, fictionId },
        });
        if (!review) {
            throw new NotFoundException('Avaliação não encontrada');
        }
        if (review.authorId !== userId) {
            throw new ForbiddenException('Apenas o autor pode excluir esta avaliação');
        }
        return this.prisma.review.delete({ where: { id } });
    }
};
ReviewsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReviewsService);
export { ReviewsService };
//# sourceMappingURL=reviews.service.js.map