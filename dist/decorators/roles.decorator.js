"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
function Roles(...roles) {
    return (0, common_1.SetMetadata)('roles', roles);
}
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map