import React, { useState } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm PGConnect Bot 🤖" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
  if (!input.trim()) return;

  const userMsg = { sender: "user", text: input };
  const text = input.toLowerCase();

  let reply = "Sorry 😅 I didn't understand. Try: rooms, rent, booking, contact.";

  // GREETINGS
  if (/(hi|hello|hey)/.test(text)) {
    reply = "Hello 👋 Welcome to PGConnect! How can I help you?";
  }

  // ABOUT
  else if (/(what is|about).*(pgconnect)/.test(text)) {
    reply = "PGConnect is a platform to search, compare and book PG accommodations.";
  }

  // ROOMS
  else if (/(room|rooms|availability|available)/.test(text)) {
    reply = "We have PG rooms in Hinjewadi, Wakad, Baner and Koregaon Park.";
  }

  // RENT
  else if (/(rent|price|cost|charges|fees)/.test(text)) {
    reply = "Rent ranges from ₹6,000 to ₹12,000 depending on location and sharing.";
  }

  // BOOKING
  else if (/(book|booking|reserve|apply)/.test(text)) {
    reply = "To book: Login → Rooms → Select → Pay → Booking Confirmed.";
  }

  // FACILITIES
  else if (/(wifi|food|laundry|parking|facility|facilities)/.test(text)) {
    reply = "Facilities include Wi-Fi, food, laundry, parking and daily cleaning.";
  }

  // CONTACT
  else if (/(contact|call|email|support|helpdesk)/.test(text)) {
    reply = "You can contact us at support@pgconnect.com or call 9876543210.";
  }

  setMessages([...messages, userMsg, { sender: "bot", text: reply }]);
  setInput("");
};


  return (
    <>
      <div className="chatbot-btn" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            PGConnect Support
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
