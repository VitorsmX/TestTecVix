import { useEffect, useState } from "react";
import { createSocket } from "../socket/client";

interface Metrics {
  cpu: { time: string; value: number };
  memory: { time: string; value: number };
}

export const useSocket = (currentVmId?: number) => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const socket = createSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("vm-metrics", (data: Metrics) => {
      setMetrics(data);
    });

    return () => {
      socket.off("vm-metrics");
    };
  }, [socket]);

  useEffect(() => {
    if (!currentVmId || !socket?.connected) return;

    socket.emit("watch-vm", currentVmId);
  }, [currentVmId, socket]);

  return { metrics };
};