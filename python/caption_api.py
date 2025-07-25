from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
from PIL import Image
from flask import Flask, request, jsonify
import torch

app = Flask(__name__)

model_name = "nlpconnect/vit-gpt2-image-captioning"
model = VisionEncoderDecoderModel.from_pretrained(model_name)
feature_extractor = ViTImageProcessor.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

@app.route("/caption", methods=["POST"])
def caption():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    image = Image.open(file.stream).convert("RGB")

    pixel_values = feature_extractor(images=[image], return_tensors="pt").pixel_values.to(device)

    output_ids = model.generate(
    pixel_values,
    max_length=16,
    num_beams=1,
    do_sample=False
)
    captions = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    return jsonify({"analysis": captions})

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=6000)
