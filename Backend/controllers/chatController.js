import Product from "../models/Product.js";


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

    // Send the message to your Python ML chatbot.
    const aiResponse = await fetch(
      `${process.env.AI_SERVICE_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
        }),
        signal: AbortSignal.timeout(10000),
      },
    );

    
if (!aiResponse.ok) {
  const errorBody = await aiResponse.text();

  console.error("Python AI HTTP error:", {
    status: aiResponse.status,
    statusText: aiResponse.statusText,
    body: errorBody,
  });

  throw new Error(
    `Python AI service returned HTTP ${aiResponse.status}`
  );
}


    const result = await aiResponse.json();
    
 if (result.intent === "check_order_status") {
      return res.status(200).json({
        success: true,
        intent: "check_order_status",
        reply:
          "To check your order status, please visit your My Orders page.",
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
            { description: { $regex: "birthday|celebration|party", $options: "i" } },
          ],
        };
      }

      const products = await Product.find(filter)
        .select("name price description image")
        .lean();

      const reply = products.length
        ? `I found ${products.length} product(s) for you!`
        : "Sorry, I couldn't find matching products. Try another cake type.";

      return res.status(200).json({
        success: true,
        ...result,
        reply,
        products,
      });
    }

    // Return the Python chatbot's response for other intents.
    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Chatbot error:", error.message);

    return res.status(503).json({
      success: false,
      message: "Sorry, the assistant is unavailable right now.",
    });
  }
};

export { sendChatMessage };