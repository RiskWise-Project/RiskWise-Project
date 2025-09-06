import os
import requests
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

HF_API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
HF_API_KEY = os.environ.get("HUGGINGFACE_API_KEY")
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "Caption API is running via Hugging Face"})

@app.route("/caption", methods=["POST"])
def caption():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if not file.filename:
        return jsonify({"error": "No file selected"}), 400

    try:
        image = Image.open(file.stream).convert("RGB")
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        image_bytes = buffered.getvalue()

        response = requests.post(
            HF_API_URL,
            headers=HEADERS,
            files={"file": ("image.png", image_bytes, "image/png")},
            timeout=60
        )

        try:
            result = response.json()
        except ValueError:
            return jsonify({
                "error": "Hugging Face API returned invalid JSON",
                "raw_text": response.text
            }), 502

        if response.status_code != 200:
            return jsonify({"error": "Hugging Face API failed", "details": result}), response.status_code

        # Extract caption safely
        if isinstance(result, list) and "generated_text" in result[0]:
            caption_text = result[0]["generated_text"]
        else:
            caption_text = str(result)

        return jsonify({"analysis": caption_text})

    except Exception as e:
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
