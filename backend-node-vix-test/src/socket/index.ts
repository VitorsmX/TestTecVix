import http from "http";
import { Server } from "socket.io";
import { generateMetricPoint } from "./metricsMock";

let io: Server;

const socketSetup = (server: http.Server) => {
  console.log("🔥 socketSetup foi chamado");

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let currentVmId: number | null = null;

    socket.on("watch-vm", (vmId: number) => {
      currentVmId = vmId;

      if (interval) clearInterval(interval);

      interval = setInterval(() => {
        if (!currentVmId) return;

        const cpu = generateMetricPoint(currentVmId, "cpu");
        const memory = generateMetricPoint(currentVmId, "memory");

        socket.emit("vm-metrics", { cpu, memory });
      }, 2000);
    });

    socket.on("disconnect", (reason) => {
      if (interval) clearInterval(interval);
      console.log("❌ Socket desconectado:", reason);
    });
  });
};

const getIO = () => {
  if (!io) throw new Error("Socket.io is not initialized!");
  return io;
};

export { socketSetup, getIO };
