import express, { Request, Response } from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const port = 3000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const prisma = new PrismaClient();
const jwtSecret = "your_jwt_secret";
// const cors = require("cors");

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// Helper function to verify JWT
const authenticateToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    // req.user = user;
    req.headers.userId = user.userId;
    next();
  });
};
// Store connected clients with their user IDs

interface Client {
  userId: number;
  ws: WebSocket;
}
let clients: Client[] = [];

// Handle WebSocket connections
wss.on("connection", (ws) => {
  let userId: number;

  ws.on("message", async (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "connect") {
      userId = parsedMessage.userId;
      clients.push({ userId, ws });
    }

    if (parsedMessage.type === "message") {
      const { senderId, receiverId, content } = parsedMessage;

      // Save message to database
      const newMessage = await prisma.message.create({
        data: {
          content,
          senderId,
          receiverId,
        },
      });

      // Find the recipient client and send the message if connected
      const recipientClient = clients.find(
        (client) => client.userId === receiverId
      );
      if (recipientClient && recipientClient.ws.readyState === WebSocket.OPEN) {
        recipientClient.ws.send(JSON.stringify(newMessage));
      }
    }
  });

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
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Username already taken" });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });
    res.json({ token: token, userId: user.id });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Endpoint to send a friend request
app.post("/sendRequest", authenticateToken, async (req, res) => {
  const userId = Number(req.headers.userId);
  const { requesterId } = req.body;

  const newRequest = await prisma.pendingRequest.create({
    data: {
      userId,
      requesterId,
    },
  });

  res.json(newRequest);
});

// Endpoint to accept a friend request
app.post("/acceptRequest", authenticateToken, async (req, res) => {
  const userId = Number(req.headers.userId);
  const { requesterId } = req.body;

  // Create connection for both users
  await prisma.connection.createMany({
    data: [
      { userId, friendId: requesterId },
      { userId: requesterId, friendId: userId },
    ],
  });

  // Delete the pending request
  await prisma.pendingRequest.deleteMany({
    where: {
      userId,
      requesterId,
    },
  });

  res.json({ msg: "Request accepted" });
});

// Endpoint to get a user's friends
app.get("/friends", authenticateToken, async (req, res) => {
  const userId = Number(req.headers.userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { connections: { include: { friend: true } } },
  });

  res.json(user?.connections.map((conn) => conn.friend));
});

// Endpoint to get a user's messages with a friend
app.get("/messages/:friendId", authenticateToken, async (req, res) => {
  const userId = Number(req.headers.userId);
  const friendId = parseInt(req.params.friendId);

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    },
  });

  res.json(messages);
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
