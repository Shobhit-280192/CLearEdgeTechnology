from flask import Flask,Response,jsonify ,render_template,request
from flask_pymongo import PyMongo
from datetime import datetime
import os


app=Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/clearedge_db"
mongo = PyMongo(app)




@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about.html")
def about():
    return render_template("about.html")

@app.route("/contact.html")
def contact():
    return render_template("contact.html")

@app.route("/portfolio.html")
def portfolio():
    return render_template("portfolio.html")

@app.route("/services.html")
def service():
    return render_template("services.html")

@app.route("/api/contact", methods=["POST"])
def contact_api():
    print("CONTACT API HIT!")
    data = request.json

    email = data.get("email")

    # ✅ Check if already exists
    existing_contact = mongo.db.contacts.find_one({"email": email})
    print(existing_contact)
    if existing_contact:
        return jsonify({
            "status": "info",
            "message": "We already have your request. Our team is working on it."
        }), 200

    # 🔐 Encrypt phone (if you added encryption earlier)
    phone = data.get("phone", "")

    contact_doc = {
        "name": data.get("name"),
        "email": email,
        "phone": phone,
        "company": data.get("company"),
        "message": data.get("message"),
        "created_at": datetime.utcnow()
    }

    mongo.db.contacts.insert_one(contact_doc)

    return jsonify({
        "status": "success",
        "message": "Thank you! Your request has been submitted successfully."
    }), 201










if __name__ == "__main__":
    app.run(debug=True)