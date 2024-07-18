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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const prisma = new client_1.PrismaClient();
const jwtSecret = "your_jwt_secret";
// const cors = require("cors");
// Middleware to parse JSON requests
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Helper function to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, user) => {
        if (err)
            return res.sendStatus(403);
        // req.user = user;
        req.headers.userId = user.userId;
        next();
    });
};
let clients = [];
// Handle WebSocket connections
wss.on("connection", (ws) => {
    let userId;
    ws.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "connect") {
            userId = parsedMessage.userId;
            clients.push({ userId, ws });
        }
        if (parsedMessage.type === "message") {
            const { senderId, receiverId, content } = parsedMessage;
            // Save message to database
            const newMessage = yield prisma.message.create({
                data: {
                    content,
                    senderId,
                    receiverId,
                },
            });
            // Broadcast the message to both the sender and the recipient
            [senderId, receiverId].forEach((id) => {
                const client = clients.find((client) => client.userId === id);
                if (client && client.ws.readyState === ws_1.WebSocket.OPEN) {
                    client.ws.send(JSON.stringify(newMessage));
                }
            });
        }
    }));
    ws.on("close", () => {
        // Remove the disconnected client
        clients = clients.filter((client) => client.ws !== ws);
    });
    ws.on("error", (error) => {
        console.error("WebSocket error:", error);
    });
});
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ msg: "I am healthy" });
});
// User registration
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const newUser = yield prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        res.json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: "Username already taken" });
    }
}));
// User login
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: { username },
    });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret);
        res.json({ token: token, userId: user.id });
    }
    else {
        res.status(401).json({ error: "Invalid credentials" });
    }
}));
// Endpoint to send a friend request
app.post("/sendRequest", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.headers.userId);
    const { requesterId } = req.body;
    const newRequest = yield prisma.pendingRequest.create({
        data: {
            userId,
            requesterId,
        },
    });
    res.json(newRequest);
}));
// Endpoint to accept a friend request
app.post("/acceptRequest", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.headers.userId);
    const { requesterId } = req.body;
    // Create connection for both users
    yield prisma.connection.createMany({
        data: [
            { userId, friendId: requesterId },
            { userId: requesterId, friendId: userId },
        ],
    });
    // Delete the pending request
    yield prisma.pendingRequest.deleteMany({
        where: {
            userId,
            requesterId,
        },
    });
    res.json({ msg: "Request accepted" });
}));
// Endpoint to get a user's friends
app.get("/friends", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.headers.userId);
    const user = yield prisma.user.findUnique({
        where: { id: userId },
        include: { connections: { include: { friend: true } } },
    });
    res.json(user === null || user === void 0 ? void 0 : user.connections.map((conn) => conn.friend));
}));
// Endpoint to get a user's messages with a friend
app.get("/messages/:friendId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.headers.userid);
    const friendId = parseInt(req.params.friendId);
    const messages = yield prisma.message.findMany({
        where: {
            OR: [
                { senderId: userId, receiverId: friendId },
                { senderId: friendId, receiverId: userId },
            ],
        },
    });
    res.json(messages);
}));
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
