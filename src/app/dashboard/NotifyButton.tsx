"use client";

import { useState } from "react";

export function NotifyButton() {
  const [status, setStatus] = useState("");

  async function sendTestNotification() {
    setStatus("Sende...");
    const response = await fetch("/api/notifications/test", { method: "POST" });
    setStatus(response.ok ? "Mail gesendet." : "Mail konnte noch nicht gesendet werden.");
  }

  return (
    <button type="button" onClick={sendTestNotification} title={status || "Test-Mail senden"}>
      Test-Mail
    </button>
  );
}
