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

    const aiServiceUrl = process.env.AI_SERVICE_URL?.trim().replace(/\/+$/, "");

    if (!aiServiceUrl) {
      throw new Error("AI_SERVICE_URL is missing");
    }

    let result;
    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {
      let shouldRetry = false;

      // Send the message to  Python ML chatbot.
      try {
        const aiResponse = await fetch(`${aiServiceUrl}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message.trim(),
          }),
          signal: AbortSignal.timeout(20000),
        });

        if (aiResponse.ok) {
          result = await aiResponse.json();
          break;
        }
        const errorBody = await aiResponse.text();

        lastError = new Error(
          `Python AI service returned HTTP ${aiResponse.status}`,
        );

        console.error("Python AI HTTP error:", {
          status: aiResponse.status,
          body: errorBody.slice(0, 500),
          attempt,
        });

        shouldRetry = [502, 503, 504].includes(aiResponse.status);
      } catch (error) {
        lastError = error;

        console.error("Python AI request error:", {
          message: error.message,
          attempt,
        });

        shouldRetry =
          error.name === "TimeoutError" ||
          error.name === "AbortError" ||
          error instanceof TypeError;
      }

      if (!shouldRetry || attempt === 3) {
        break;
      }

      console.log(`Retrying Python AI request after attempt ${attempt}...`);

      await new Promise((resolve) => setTimeout(resolve, attempt * 4000));
    }
    if (!result) {
      throw lastError || new Error("Python AI service returned no result");
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
