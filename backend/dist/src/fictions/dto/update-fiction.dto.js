var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsString, IsInt, Min, Max, IsNotEmpty, } from 'class-validator';
export class UpdateFictionDto {
    title;
    description;
    genre;
    publishedAt;
    link;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateFictionDto.prototype, "title", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateFictionDto.prototype, "description", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateFictionDto.prototype, "genre", void 0);
__decorate([
    IsInt(),
    Min(1900),
    Max(2100),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateFictionDto.prototype, "publishedAt", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], UpdateFictionDto.prototype, "link", void 0);
//# sourceMappingURL=update-fiction.dto.js.map