from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import requests
import os

app = Flask(__name__)
CORS(app)

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

@app.route("/send-support-message", methods=["POST"])
def send_support_message():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    method = data.get("method")

    full_msg = f"📨 New Support Message\n👤 From: {name}\n📧 Email: {email}\n💬 Message: {message}"

    if method == "telegram":
        try:
            requests.post(f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage", json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": full_msg
            })
        except Exception as e:
            print("Telegram error:", e)

    elif method == "email":
        try:
            msg = MIMEText(full_msg)
            msg['Subject'] = "New Support Message"
            msg['From'] = email
            msg['To'] = EMAIL_ADDRESS

            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                smtp.send_message(msg)
        except Exception as e:
            print("Email error:", e)

    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
