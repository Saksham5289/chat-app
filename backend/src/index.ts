import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const prisma = new PrismaClient();

interface Client {
  userId: number;
  ws: WebSocket;
}

// Store connected clients with their user IDs
let clients: Client[] = [];

// Middleware to parse JSON requests
app.use(express.json());

// Handle WebSocket connections
wss.on("connection", (ws) => {
  let userId: number;

  ws.on("message", async (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "connect") {
      userId = parsedMessage.userId;
      clients.push({ userId, ws });
      clients.forEach((a) => {
        console.log(a.userId);
      });
    }

    if (parsedMessage.type === "message") {
      const { senderId, receiverId, content } = parsedMessage;

      // Save message to database
      // const newMessage = await prisma.message.create({
      //   data: {
      //     content,
      //     senderId,
      //     receiverId,
      //   },
      // });

      const newMessage = {
        content,
        senderId,
        receiverId,
      };
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

// Endpoint to send a friend request
app.post("/sendRequest", async (req, res) => {
  const { userId, requesterId } = req.body;

  const newRequest = await prisma.pendingRequest.create({
    data: {
      userId,
      requesterId,
    },
  });

  res.json(newRequest);
});

// Endpoint to accept a friend request
app.post("/acceptRequest", async (req, res) => {
  const { userId, requesterId } = req.body;

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
app.get("/friends/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { connections: { include: { friend: true } } },
  });

  res.json(user?.connections.map((conn) => conn.friend));
});

// Endpoint to get a user's messages with a friend
app.get("/messages/:userId/:friendId", async (req, res) => {
  const userId = parseInt(req.params.userId);
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
