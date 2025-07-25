import os
import gc
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
from PIL import Image
from flask import Flask, request, jsonify
import torch

app = Flask(__name__)

# Force CPU usage and memory optimizations
os.environ['CUDA_VISIBLE_DEVICES'] = ''
torch.set_num_threads(1)

# Load model with memory optimizations
model_name = "nlpconnect/vit-gpt2-image-captioning"

print("Loading model components...")
try:
    model = VisionEncoderDecoderModel.from_pretrained(
        model_name,
        torch_dtype=torch.float32
    )
    feature_extractor = ViTImageProcessor.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    # Force CPU device
    device = torch.device("cpu")
    model.to(device)
    
    # Run garbage collection after loading
    gc.collect()
    print("Model loaded successfully on CPU")
    
except Exception as e:
    print(f"Error loading model: {e}")
    raise e

@app.route("/", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Caption API is running"})

@app.route("/caption", methods=["POST"])
def caption():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Process image
        image = Image.open(file.stream).convert("RGB")

        # Generate caption with memory optimization
        with torch.no_grad():  # Don't compute gradients
            pixel_values = feature_extractor(
                images=[image], 
                return_tensors="pt"
            ).pixel_values.to(device)

            output_ids = model.generate(
                pixel_values,
                max_length=16,
                num_beams=1,
                do_sample=False,
                early_stopping=True
            )
            
            caption = tokenizer.decode(output_ids[0], skip_special_tokens=True)

        # Clean up variables
        del pixel_values, output_ids
        gc.collect()

        return jsonify({"analysis": caption})
    
    except Exception as e:
        # Clean up on error
        gc.collect()
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

if __name__ == '__main__':
    # Use PORT environment variable (Render requirement)
    port = int(os.environ.get('PORT', 5000))  # Changed default to 5000
    
    # Required for Render: bind to all interfaces
    app.run(
        host='0.0.0.0', 
        port=port, 
        debug=False,
        threaded=True
    )