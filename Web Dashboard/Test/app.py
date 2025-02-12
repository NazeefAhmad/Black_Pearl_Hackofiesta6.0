# from flask import Flask, request, jsonify
# import cv2
# import numpy as np
# import base64
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Allow frontend requests

# # Load OpenCV face detector
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# def process_image(image_data):
#     """Detect faces in the received image."""
#     # Decode Base64 Image
#     img_bytes = base64.b64decode(image_data)
#     nparr = np.frombuffer(img_bytes, np.uint8)
#     image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     # Convert to grayscale
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

#     # Detect faces
#     faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
#     return {"faces_detected": len(faces)}

# @app.route('/detect', methods=['POST'])
# def detect():
#     try:
#         data = request.get_json()
#         image_data = data.get('image')

#         if not image_data:
#             return jsonify({"error": "No image provided"}), 400

#         result = process_image(image_data)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, host="0.0.0.0", port=5000)

from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Load OpenCV face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

def process_image(image_data):
    """Detect faces in the received image."""
    # Decode Base64 Image
    img_bytes = base64.b64decode(image_data)
    nparr = np.frombuffer(img_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    # Return the number of faces detected and assume "Happy" emotion for now
    return {"faces_detected": len(faces), "emotion": "Happy"}

@app.route('/detect', methods=['POST'])
def detect():
    try:
        data = request.get_json()
        image_data = data.get('image')

        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        result = process_image(image_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
