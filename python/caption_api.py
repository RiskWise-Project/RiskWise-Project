import os
import gc
from flask import Flask, request, jsonify
from PIL import Image
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
import io

app = Flask(__name__)

# Load BLIP model and processor once
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
model.to(device)
model.eval()

@app.route("/", methods=["GET"])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "message": "Local BLIP caption API is running"})

@app.route("/caption", methods=["POST"])
def caption():
    """Generate caption for uploaded image locally."""
    try:
        # 1️⃣ Validate file
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        file = request.files['file']
        if not file.filename:
            return jsonify({"error": "No file selected"}), 400

        # 2️⃣ Open image
        try:
            image = Image.open(file.stream).convert("RGB")
        except Exception as e:
            return jsonify({"error": f"Failed to process image: {str(e)}"}), 400

        # 3️⃣ Generate caption
        try:
            inputs = processor(images=image, return_tensors="pt").to(device)
            out = model.generate(**inputs)
            caption_text = processor.decode(out[0], skip_special_tokens=True)
        except Exception as e:
            return jsonify({"error": f"Caption generation failed: {str(e)}"}), 500

        # 4️⃣ Cleanup memory
        gc.collect()
        torch.cuda.empty_cache() if device == "cuda" else None

        return jsonify({"analysis": caption_text})

    except Exception as e:
        gc.collect()
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
