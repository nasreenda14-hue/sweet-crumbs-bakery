from pathlib import Path
import joblib
from fastapi import FastAPI
from pydantic import BaseModel, Field

# Load our trained machine-learning model
model_path = Path(__file__).with_name("intent_model.joblib")
model = joblib.load(model_path)

# Create the FastAPI application
app = FastAPI(title="Sweet Crumbs Chatbot")


# Define the format of a customer's message
class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)


# Predefined replies for recognized intents
responses = {
    "greeting": (
        "Hello! Welcome to Sweet Crumbs Bakery. "
        "How can I help you?"
    ),
    "view_products": (
        "I'd be happy to help you explore our cakes and desserts!"
    ),
    "check_order_status": (
        "I can help you check your order status. "
        "Please provide your order details."
    ),
    "delivery_time": (
        "Delivery time depends on your location and order. "
        "Please contact Sweet Crumbs Bakery to confirm."
),

    "delivery_charges": (
        "Delivery charges depend on your location. "
        "Please contact Sweet Crumbs Bakery to confirm the cost."
),

    "delivery_areas": (
        "Please share your delivery location so we can check "
        "whether delivery is available in your area."
    ),

    "same_day_delivery": (
        "Same-day delivery depends on order time and cake availability. "
        "Please contact Sweet Crumbs Bakery to confirm."
    )
}


# Check whether the API is running
@app.get("/")
def home():
    return {
        "message": "Sweet Crumbs Chatbot API is running!"
    }


# Receive a message and generate a reply
@app.post("/chat")
def chat(request: ChatRequest):
    message = request.message.strip()

    if not message:
        return {"reply": "Please enter a message."}

    probabilities = model.predict_proba([message])[0]
    best_index = probabilities.argmax()
    confidence = float(probabilities[best_index])
    intent = model.classes_[best_index]

    print("Customer message:", message)
    print("Predicted intent:", intent, "| Confidence:", confidence)

    if confidence < 0.30:
        return {
            "user_message": message,
            "intent": "unknown",
            "reply": (
                "Sorry, I didn't understand that. "
                "You can ask about our products, delivery, or orders."
            ),
        }

    reply = responses.get(
        intent,
        "Sorry, I didn't understand that. "
        "Please ask about our products, delivery, or orders."
    )

    return {
        "user_message": message,
        "intent": intent,
        "confidence": confidence,
        "reply": reply,
    }
   