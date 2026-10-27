import Product from "../models/Product.js";

const getFallbackResult = (message) => {
  const text = message.toLowerCase().trim();

  if (
    /\b(order status|track my order|where is my order|check my order|has my order|when will my order arrive)\b/.test(
      text,
    )
  ) {
    return {
      intent: "check_order_status",
      reply: "To check your order status, please visit your My Orders page.",
    };
  }

  if (/\b(delivery|deliver|how long|how many days)\b/.test(text)) {
    return {
      intent: "delivery_time",
      reply:
        "Delivery time depends on your location and order. Please contact the bakery for a delivery estimate.",
    };
  }

  if (
    /\b(hello|hi|hey|greetings|good morning|good afternoon|good evening)\b/.test(
      text,
    )
  ) {
    return {
      intent: "greeting",
      reply:
        "Hello! Welcome to Sweet Crumbs Bakery. 🍰 How can I help you today?",
    };
  }

  if (
    /\b(cake|cakes|chocolate|choco|vanilla|birthday|product|products|menu|dessert|desserts|pastry|pastries)\b/.test(
      text,
    )
  ) {
    return {
      intent: "view_products",
      reply: "Let me look for matching bakery products!",
    };
  }

  return {
    intent: "unknown",
    reply:
      "I can help you explore our cakes, ask about delivery, or find your My Orders page.",
  };
};

const sendChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Message must be 1000 characters or fewer.",
      });
    }

    const aiServiceUrl = process.env.AI_SERVICE_URL?.trim().replace(/\/+$/, "");

    let result;
    try {
      if (!aiServiceUrl) {
        throw new Error("AI_SERVICE_URL is not configured");
      }

      // Send the message to  Python ML chatbot.

      const aiResponse = await fetch(`${aiServiceUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!aiResponse.ok) {
        const errorBody = await aiResponse.text();

        console.error("Python AI HTTP error:", {
          status: aiResponse.status,
          body: errorBody.slice(0, 300),
          attempt,
        });

        throw new Error(`Python AI service returned HTTP ${aiResponse.status}`);
      }

      result = await aiResponse.json();
    } catch (error) {
      console.error("Python AI unavailable; using fallback:", error.message);
      result = getFallbackResult(message);
    }

    if (result.intent === "check_order_status") {
      return res.status(200).json({
        success: true,
        intent: "check_order_status",
        reply: "To check your order status, please visit your My Orders page.",
      });
    }

    if (result.intent === "view_products") {
      const messageLower = message.toLowerCase();
      let filter = {};

      if (
        messageLower.includes("chocolate") ||
        messageLower.includes("choco")
      ) {
        filter = {
          $or: [
            { name: { $regex: "chocolate|choco", $options: "i" } },
            { description: { $regex: "chocolate|choco", $options: "i" } },
          ],
        };
      } else if (messageLower.includes("vanilla")) {
        filter = {
          $or: [
            { name: { $regex: "vanilla", $options: "i" } },
            { description: { $regex: "vanilla", $options: "i" } },
          ],
        };
      } else if (messageLower.includes("birthday")) {
        filter = {
          $or: [
            { name: { $regex: "birthday|celebration|party", $options: "i" } },
            {
              description: {
                $regex: "birthday|celebration|party",
                $options: "i",
              },
            },
          ],
        };
      }

      const products = await Product.find(filter)
        .select("name price description image")
        .lean();

      return res.status(200).json({
        success: true,
        ...result,
        reply: products.length
          ? `I found ${products.length} product(s) for you!`
          : "Sorry, I couldn't find matching products. Try another cake type.",
        products,
      });
    }

    // Return the Python chatbot's response for other intents.
    return res.status(200).json({
      success: true,
      ...result,
      products: [],
    });
  } catch (error) {
    console.error("Chatbot controller error:", error.message);

    return res.status(503).json({
      success: false,
      message: "Sorry, the assistant is unavailable right now.",
    });
  }
};

export { sendChatMessage };
