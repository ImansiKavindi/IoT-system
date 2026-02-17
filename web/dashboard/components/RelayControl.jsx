"use client";
import React from "react";

export default function RelayControl({ id, state, onToggle }) {
  return (
    <div style={{ margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
      <p>Relay {id}: {state}</p>
      <button onClick={() => onToggle(id)}>
        {state === "ON" ? "Turn OFF" : "Turn ON"}
      </button>
    </div>
  );
}
