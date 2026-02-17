"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // backend server

export default function RealtimeHandler({ onTelemetry }) {
  useEffect(() => {
    socket.on("telemetry", (data) => {
      // console.log("Realtime:", data);
      onTelemetry(data); // send to parent
    });

    return () => {
      socket.off("telemetry");
    };
  }, []);

  return null; // no UI needed
}
