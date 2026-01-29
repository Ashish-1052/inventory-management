"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("prisma/config");
exports.default = (0, config_1.defineConfig)({
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: process.env.DATABASE_URL || "postgresql://postgres:PG1234@localhost:5432/inventory",
    },
});
//# sourceMappingURL=prisma.config.js.map