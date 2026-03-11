"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../../../shared/types");
let User = class User {
};
exports.User = User;
User.uniqueKey = ['lineUserId', 'lineOaId'];
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_user_id', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "lineUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_oa_id', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "lineOaId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: types_1.ConversationState.START,
    }),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'screening_step', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "screeningStep", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'screening_score', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "screeningScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_message', type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastMessage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map