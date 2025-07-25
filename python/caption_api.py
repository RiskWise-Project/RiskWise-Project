import os
import gc
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
from PIL import Image
from flask import Flask, request, jsonify
import torch

app = Flask(__name__)


os.environ['CUDA_VISIBLE_DEVICES'] = ''
torch.set_num_threads(1)


model_name = "nlpconnect/vit-gpt2-image-captioning"

print("Loading model components...")
try:
    model = VisionEncoderDecoderModel.from_pretrained(
        model_name,
        torch_dtype=torch.float32,
        low_cpu_mem_usage=True
    )
    feature_extractor = ViTImageProcessor.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    

    device = torch.device("cpu")
    model.to(device)
    
   
    gc.collect()
    print("Model loaded successfully on CPU")
    
except Exception as e:
    print(f"Error loading model: {e}")
    raise e

@app.route("/", methods=["GET"])
def health_check():
    
    return jsonify({"status": "healthy", "message": "Caption API is running"})

@app.route("/caption", methods=["POST"])
def caption():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
      
        image = Image.open(file.stream).convert("RGB")

        
        with torch.no_grad():  
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

        
        del pixel_values, output_ids
        gc.collect()

        return jsonify({"analysis": caption})
    
    except Exception as e:
       
        gc.collect()
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 4000))  
    
   
    app.run(
        host='0.0.0.0', 
        port=port, 
        debug=False,
        threaded=True
    )