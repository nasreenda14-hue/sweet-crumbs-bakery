import { useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function getImageUrl(image) {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_BASE_URL.replace(/\/$/, "")}/${image.replace(/^\/+/, "")}`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! Welcome to Sweet Crumbs Bakery. 🍰 How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  
const sendMessage = async (event) => {
  event.preventDefault();

  const text = message.trim();

  if (!text || isLoading) return;

  const token = localStorage.getItem("token");

  if (!token) {
    setMessages((previous) => [
      ...previous,
      {
        role: "bot",
        text: "Please log in to your account to use the chatbot.",
      },
    ]);
    return;
  }

  setMessages((previous) => [
    ...previous,
    { role: "user", text },
  ]);

  setMessage("");
  setIsLoading(true);

  try {
    const response = await fetch(
      `${API_BASE_URL.replace(/\/$/, "")}/api/v1/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to send your message."
      );
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "bot",
        text: data.reply || "How else can I help you?",
        products: data.products || [],
      },
    ]);
  } catch (error) {
    setMessages((previous) => [
      ...previous,
      {
        role: "bot",
        text: error.message || "Sorry, I couldn't connect right now. Please try again.",
      },
    ]);

    console.error("Chatbot error:", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      {/* Floating chatbot button */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-5 z-[1000] flex h-14 w-14 items-center justify-center rounded-full bg-amber-700 text-2xl text-white shadow-xl transition hover:scale-105 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300"
      >
        {isOpen ? "×" : "☏"}
      </button>

      {/* Responsive chat window */}
      {isOpen && (
        <section
          aria-label="Sweet Crumbs customer support chat"
          className="fixed inset-0 z-[999] flex flex-col overflow-hidden bg-white text-stone-800 sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(680px,calc(100dvh-8rem))] sm:w-[390px] sm:rounded-2xl sm:border sm:border-stone-200 sm:shadow-2xl"
        >
          {/* Header */}
          <header className="flex shrink-0 items-center gap-3 bg-amber-800 px-4 py-4 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl">
              🍰
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-semibold">Sweet Crumbs</h2>
              <p className="text-xs text-amber-100">
                Bakery assistant · Online
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-lg px-3 py-1 text-2xl hover:bg-white/15 sm:hidden"
            >
              ×
            </button>
          </header>

          {/* Messages */}
          <div
            className="flex-1 space-y-4 overflow-y-auto bg-stone-50 p-4"
            aria-live="polite"
          >
            <p className="text-center text-xs text-stone-400">
              Welcome to our little bakery 💛
            </p>    

            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] min-w-0 rounded-2xl px-3 py-3 text-sm leading-6 ${
                    item.role === "user"
                      ? "rounded-br-sm bg-amber-800 text-white"
                      : "rounded-bl-sm border border-stone-200 bg-white text-stone-700 shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {item.text}
                  </p>

                  {/* Real MongoDB product cards */}
                  {item.products?.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 gap-3">
                      {item.products.map((product) => (
                        <article
                          key={product._id || product.name}
                          className="overflow-hidden rounded-xl border border-stone-200 bg-white text-stone-800"
                        >
                          {product.image ? (
                            <img
                              src={getImageUrl(product.image)}
                              alt={product.name}
                              loading="lazy"
                              className="h-36 w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-28 items-center justify-center bg-amber-50 text-4xl">
                              🍰
                            </div>
                          )}

                          <div className="p-3">
                            <h3 className="font-semibold">
                              {product.name}
                            </h3>

                            <p className="mt-1 font-bold text-amber-800">
                              ₹{Number(product.price).toLocaleString("en-IN")}
                            </p>

                            <p className="mt-1 break-words text-xs leading-5 text-stone-500">
                              {product.description}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-sm text-stone-500" role="status">
                Sweet Crumbs is thinking...
              </div>
            )}
          </div>

          {/* Message input */}
          <form
            onSubmit={sendMessage}
            className="flex shrink-0 items-center gap-2 border-t border-stone-200 bg-white p-3"
          >
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about our cakes..."
              aria-label="Your message"
              maxLength={1000}
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-full border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-100 disabled:bg-stone-100"
            />

            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-800 text-lg text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </section>
      )}
    </>
  );
}
