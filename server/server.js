"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const express_1 = __importDefault(require("express"));
const express_2 = require("@trpc/server/adapters/express");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('<h1>Goodbye, world!</h1>');
});
const t = server_1.initTRPC.create();
const appRouter = t.router({
    findmany: t.procedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield fetch('http://localhost:4000/superheroes');
        const data = yield res.json();
        return { heroes: data };
    })),
    findone: t.procedure.input(zod_1.z.number()).query((req) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = req;
        const res = yield fetch(`http://localhost:4000/superheroes/${input}`);
        console.log(`http://localhost:4000/superheroes/${input}`);
        const data = yield res.json();
        return { hero: data };
    })),
    create: t.procedure.input(zod_1.z.object({
        name: zod_1.z.string(),
        alterEgo: zod_1.z.string()
    })).mutation((req) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = req;
        const hero = yield fetch('http://localhost:4000/superheroes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const data = yield hero.json();
        return { hero: data };
    })),
    delete: t.procedure.input(zod_1.z.number()).mutation((req) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = req;
        yield fetch(`http://localhost:4000/superheroes/${input}`, {
            method: 'DELETE'
        });
    })),
    update: t.procedure.input(zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string()
    })).mutation((req) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = req;
        const hero = yield fetch(`http://localhost:4000/superheroes/${input.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: input.name })
        });
        return { hero };
    }))
});
const port = Number(process.env.PORT) || 3000;
app.use('/trpc', (0, express_2.createExpressMiddleware)({
    router: appRouter,
    createContext: () => ({})
}));
const start = (port) => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
};
start(port);
