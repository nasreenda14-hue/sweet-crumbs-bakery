from pathlib import Path

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline



# 1. TRAINING DATA
# Each question is paired with its correct intent.


training_data = [
    # Greetings
    ("hello", "greeting"),
    ("hi", "greeting"),
    ("hey", "greeting"),
    ("hello there", "greeting"),
    ("good morning", "greeting"),
    ("good afternoon", "greeting"),
    ("good evening", "greeting"),
    ("how are you", "greeting"),

    # View products
    ("show me your products", "view_products"),
    ("show me your cakes", "view_products"),
    ("show me chocolate cakes", "view_products"),
    ("do you have chocolate cake", "view_products"),
    ("show me vanilla cakes", "view_products"),
    ("what desserts do you have", "view_products"),
    ("show me the menu", "view_products"),
    ("do you sell birthday cakes", "view_products"),
    ("show me your pastries", "view_products"),
    ("I want to see bakery items", "view_products"),

    # Check order status
    ("where is my order", "check_order_status"),
    ("check my order status", "check_order_status"),
    ("track my order", "check_order_status"),
    ("what is happening with my order", "check_order_status"),
    ("is my order ready", "check_order_status"),
    ("has my order been shipped", "check_order_status"),
    ("I want to know my order status", "check_order_status"),
    ("where is my cake order", "check_order_status"),

    # Delivery time
    ("how long does delivery take", "delivery_time"),
    ("what is the delivery time", "delivery_time"),
    ("how many days for delivery", "delivery_time"),
    ("when can I receive my cake", "delivery_time"),
    ("when will my cake arrive", "delivery_time"),
    ("how soon can you deliver", "delivery_time"),
    ("how much time will delivery take", "delivery_time"),
    ("how long until my order arrives", "delivery_time"),
    ("when will you deliver my order", "delivery_time"),
    ("how long do I have to wait for delivery", "delivery_time"),

    # Delivery charges
    ("what are your delivery charges", "delivery_charges"),
    ("how much is delivery", "delivery_charges"),
    ("how much does delivery cost", "delivery_charges"),
    ("is delivery free", "delivery_charges"),
    ("what is the delivery fee", "delivery_charges"),
    ("how much do you charge for delivery", "delivery_charges"),
    ("tell me the delivery cost", "delivery_charges"),
    ("delivery charges", "delivery_charges"),
    ("delivery fee", "delivery_charges"),
    ("what is the shipping cost", "delivery_charges"),

    # Delivery areas
    ("do you deliver to my area", "delivery_areas"),
    ("which areas do you deliver to", "delivery_areas"),
    ("do you deliver to my location", "delivery_areas"),
    ("is delivery available in my area", "delivery_areas"),
    ("where do you deliver", "delivery_areas"),
    ("do you deliver to my city", "delivery_areas"),
    ("is my area covered by delivery", "delivery_areas"),
    ("what locations do you serve", "delivery_areas"),

    # Same-day delivery
    ("can you deliver today", "same_day_delivery"),
    ("do you offer same day delivery", "same_day_delivery"),
    ("can I get a cake today", "same_day_delivery"),
    ("can I order a cake for today", "same_day_delivery"),
    ("can you deliver my cake on the same day", "same_day_delivery"),
    ("I need a cake today", "same_day_delivery"),
    ("is same day cake delivery available", "same_day_delivery"),
    ("can I receive my order today", "same_day_delivery"),
]



# 2. SEPARATE QUESTIONS AND INTENTS


questions = [item[0] for item in training_data]
intents = [item[1] for item in training_data]

print("Total questions:", len(questions))
print("Total intent labels:", len(intents))

# Check that every question has a matching label.
assert len(questions) == len(intents), (
    "Error: the number of questions and intent labels does not match."
)



# 3. CREATE AND TRAIN THE MODEL


model = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2)),
    LogisticRegression(max_iter=1000, random_state=42)
)

model.fit(questions, intents)



# 4. SAVE THE TRAINED MODEL


model_path = Path(__file__).with_name("intent_model.joblib")

joblib.dump(model, model_path)

print("\nChatbot model trained successfully!")
print("Model saved to:", model_path)
print("Available intents:", list(model.classes_))



# 5. TEST THE MODEL


test_messages = [
    "hello",
    "show me your chocolate cakes",
    "where is my order",
    "How long does delivery take?",
    "What are your delivery charges?",
    "Do you deliver to my area?",
    "Can you deliver today?",
]

print("\n========== CHATBOT TEST RESULTS ==========\n")

for message in test_messages:
    predicted_intent = model.predict([message])[0]

    probabilities = model.predict_proba([message])[0]
    confidence = float(probabilities.max())

    print("Customer:", message)
    print("Predicted intent:", predicted_intent)
    print("Confidence:", round(confidence, 2))
    print("-" * 45)

