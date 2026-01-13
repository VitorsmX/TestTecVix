export interface MetricPoint {
  time: string;
  value: number;
}

const hashVM = (vmId: number) => {
  let h = 0;
  const s = String(vmId);
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
  }
  return Math.abs(h);
};

const rand = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const generateMetricPoint = (vmId: number, type: "cpu" | "memory") => {
  const seed = hashVM(vmId) + Date.now() / 1000;

  const base = type === "cpu" ? 20 + (seed % 40) : 30 + (seed % 50);

  const variation = rand(seed) * 10 - 5;

  return {
    time: new Date().toLocaleTimeString(),
    value: Math.min(100, Math.max(1, Math.round(base + variation))),
  };
};
