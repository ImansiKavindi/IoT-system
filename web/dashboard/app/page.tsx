"use client";
import { useState, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import RelayControl from "../components/RelayControl";

const API_BASE = "http://localhost:3000";
const socket = io(API_BASE);

type Telemetry = { topic: string; message: string };

export default function Home() {
  const [relayStates, setRelayStates] = useState<{ [key: string]: string }>({});

  const handleTelemetry = useCallback(({ topic, message }: Telemetry) => {
    if (topic.startsWith("stm32/status/out")) {
      const id = topic.replace("stm32/status/out", "");
      setRelayStates((prev) => ({ ...prev, [id]: message }));
    }
  }, []);

  socket.on("telemetry", handleTelemetry);

  const handleToggle = async (id: string) => {
    const newState = relayStates[id] === "ON" ? "OFF" : "ON";
    try {
      await axios.post(`${API_BASE}/device/control`, { id, state: newState });
    } catch (err) {
      console.error("Failed to toggle relay:", err);
    }
  };

  const relays = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  return (
    <div>
      <h1>Relay Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {relays.map((id) => (
          <RelayControl
            key={id}
            id={id}
            state={relayStates[id] || "OFF"}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
