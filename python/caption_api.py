import os
import gc
from flask import Flask, request, jsonify
from PIL import Image
import torch
from transformers import BlipForConditionalGeneration, BlipProcessor

app = Flask(__name__)

os.environ["CUDA_VISIBLE_DEVICES"] = ""
torch.set_num_threads(1)
device = torch.device("cpu")

MODEL_NAME = "Salesforce/blip-image-captioning-base"
model = None
processor = None

def load_model():
    global model, processor
    if model is None or processor is None:
        print(f"Loading BLIP model from {MODEL_NAME} on CPU...")
        processor = BlipProcessor.from_pretrained(MODEL_NAME)
        model = BlipForConditionalGeneration.from_pretrained(MODEL_NAME).to(device)
        gc.collect()
        print("BLIP model loaded successfully.")

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "Caption API is running"})

@app.route("/caption", methods=["POST"])
def caption():
    try:
        load_model()  # Lazy-load model only when needed

        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        image = Image.open(file.stream).convert("RGB")
        inputs = processor(images=image, return_tensors="pt").to(device)

        with torch.no_grad():
            output_ids = model.generate(**inputs, max_length=16, num_beams=1)
            caption_text = processor.decode(output_ids[0], skip_special_tokens=True)

        del inputs, output_ids
        gc.collect()

        return jsonify({"caption": caption_text})

    except Exception as e:
        gc.collect()
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Caption API on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=False, threaded=False)
