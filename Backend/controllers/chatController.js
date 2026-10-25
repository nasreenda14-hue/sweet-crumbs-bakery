import Product from "../models/Product.js";
import Order from "../models/Order.js";

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
      throw new Error("Python AI service request failed");
    }

    const result = await aiResponse.json();
    
if (result.intent === "check_order_status") {
  const order = await Order.findOne({
    user: req.user.id,
  })
    .populate("product", "name")
    .sort({ createdAt: -1 });

  if (!order) {
    return res.status(200).json({
      success: true,
      intent: "check_order_status",
      reply:
        "I couldn't find an order on your account. Please log in with the account you used to place your order.",
    });
  }

  const statusMessages = {
    pending: "Your order has been received and is awaiting preparation.",
    prepared: "Your order is prepared and awaiting delivery.",
    delivered: "Your order has been marked as delivered.",
    cancel: "Your order has been cancelled.",
  };

  return res.status(200).json({
    success: true,
    intent: "check_order_status",
    reply: `Your order for ${
      order.product?.name || "your product"
    }: ${
      statusMessages[order.status] ||
      "Please contact us for an update."
    }`,
    order: {
      orderId: order._id,
      status: order.status,
    },
  });
}


    // Retrieve real products from MongoDB when requested.
   if (result.intent === "view_products") {
  const messageLower = message.toLowerCase();

  let filter = {};

  if (
    messageLower.includes("chocolate") ||
    messageLower.includes("choco")
  ) {
    filter = {
      $or: [
        { name: { $regex: "chocolate", $options: "i" } },
        { description: { $regex: "chocolate|choco", $options: "i" } },
      ],}
    }
    else if (messageLower.includes("vanilla")) {
        filter = {
          $or: [
            { name: { $regex: "vanilla", $options: "i" } },
            { description: { $regex: "vanilla", $options: "i" } },
          ],}
        } else if (messageLower.includes("birthday")) {
        filter = {
          $or: [
            { name: { $regex: "birthday", $options: "i" } },
            { description: { $regex: "birthday", $options: "i" } },
          ],};
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
