import os
import gc
import requests
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

# Hugging Face API setup
HF_API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
HF_API_KEY = os.environ.get("HUGGINGFACE_API_KEY")  # ✅ your backend env var
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "Caption API is running via Hugging Face"})

@app.route("/caption", methods=["POST"])
def caption():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Convert uploaded file to bytes
        image = Image.open(file.stream).convert("RGB")
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        image_bytes = buffered.getvalue()

        # Send request to Hugging Face Inference API
        response = requests.post(
            HF_API_URL,
            headers=HEADERS,
            data=image_bytes,
        )

        if response.status_code != 200:
            return jsonify({"error": "Hugging Face API failed", "details": response.json()}), 500

        result = response.json()

        # Hugging Face returns a list with "generated_text"
        caption_text = result[0]["generated_text"] if isinstance(result, list) else str(result)

        # Cleanup
        gc.collect()

        return jsonify({"analysis": caption_text})

    except Exception as e:
        gc.collect()
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
