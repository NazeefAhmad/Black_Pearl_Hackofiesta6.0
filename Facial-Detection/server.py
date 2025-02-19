# # from fastapi import FastAPI, File, UploadFile
# # import cv2
# # import numpy as np
# # from io import BytesIO
# # from deepface import DeepFace
# # from fastapi.middleware.cors import CORSMiddleware
# # from fastapi.responses import JSONResponse

# # # Initialize FastAPI app
# # app = FastAPI()

# # # Configure CORS more explicitly
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:5173"],  # Just focus on Vite's port for now
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# #     expose_headers=["*"]
# # )

# # # Load OpenCV face cascade
# # face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# # @app.post("/detect-emotion/")
# # async def predict(file: UploadFile = File(...)):
# #     try:
# #         # Read image from request
# #         contents = await file.read()
# #         np_img = np.frombuffer(contents, np.uint8)
# #         img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

# #         # Convert to grayscale
# #         gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# #         rgb = cv2.cvtColor(gray, cv2.COLOR_GRAY2RGB)

# #         # Detect faces
# #         faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

# #         emotions = []
# #         for (x, y, w, h) in faces:
# #             face_roi = rgb[y:y + h, x:x + w]

# #             # Perform emotion analysis
# #             result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
# #             dominant_emotion = result[0]['dominant_emotion']
# #             emotions.append(dominant_emotion)

# #             print(f"Emotions detected: {emotions}")

# #         return JSONResponse(
# #             content={"emotions": emotions},
# #             headers={
# #                 "Access-Control-Allow-Origin": "http://localhost:5173"
# #             }
# #         )
    
# #     except Exception as e:
# #         return JSONResponse(
# #             content={"error": str(e)},
# #             status_code=500,
# #             headers={
# #                 "Access-Control-Allow-Origin": "http://localhost:5173"
# #             }
# #         )

# # # Add an OPTIONS endpoint to handle preflight requests
# # @app.options("/detect-emotion/")
# # async def options_emotion():
# #     return JSONResponse(
# #         content={"message": "OK"},
# #         headers={
# #             "Access-Control-Allow-Origin": "http://localhost:5173",
# #             "Access-Control-Allow-Methods": "POST, OPTIONS",
# #             "Access-Control-Allow-Headers": "Content-Type"
# #         }
# #     )

# # # Run the server
# # if __name__ == "__main__":
# #     import uvicorn
# #     uvicorn.run(app, host="0.0.0.0", port=8000)
# # from fastapi import FastAPI, File, UploadFile
# # import cv2
# # import numpy as np
# # from io import BytesIO
# # from deepface import DeepFace
# # from fastapi.middleware.cors import CORSMiddleware
# # from fastapi.responses import JSONResponse

# # # Initialize FastAPI app
# # app = FastAPI()

# # # Configure CORS more explicitly
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  # Just focus on Vite's port for now
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# #     expose_headers=["*"]
# # )

# # # Load OpenCV face cascade
# # face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# # @app.post("/detect-emotion/")
# # async def predict(file: UploadFile = File(...)):
# #     try:
# #         # Read image from request
# #         contents = await file.read()
# #         np_img = np.frombuffer(contents, np.uint8)
# #         img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

# #         # Convert to grayscale
# #         gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# #         rgb = cv2.cvtColor(gray, cv2.COLOR_GRAY2RGB)

# #         # Detect faces
# #         faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

# #         emotions = []
# #         for (x, y, w, h) in faces:
# #             face_roi = rgb[y:y + h, x:x + w]

# #             # Perform emotion analysis
# #             result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
# #             dominant_emotion = result[0]['dominant_emotion']
# #             emotions.append(dominant_emotion)

# #             print(f"Emotions detected: {emotions}")

# #         return JSONResponse(
# #             content={"emotions": emotions},
# #             headers={
# #                 "Access-Control-Allow-Origin": "http://localhost:5173"
# #             }
# #         )
    
# #     except Exception as e:
# #         return JSONResponse(
# #             content={"error": str(e)},
# #             status_code=500,
# #             headers={
# #                 "Access-Control-Allow-Origin": "http://localhost:5173"
# #             }
# #         )

# # # Add an OPTIONS endpoint to handle preflight requests
# # @app.options("/detect-emotion/")
# # async def options_emotion():
# #     return JSONResponse(
# #         content={"message": "OK"},
# #         headers={
# #             "Access-Control-Allow-Origin": "http://localhost:5173",
# #             "Access-Control-Allow-Methods": "POST, OPTIONS",
# #             "Access-Control-Allow-Headers": "Content-Type"
# #         }
# #     )

# # # Run the server
# # if __name__ == "__main__":
# #     import uvicorn
# #     uvicorn.run(app, host="0.0.0.0", port=8000)
# from fastapi import FastAPI, File, UploadFile, Request
# import cv2
# import numpy as np
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from deepface import DeepFace

# # Initialize FastAPI app
# app = FastAPI()

# # Configure CORS with specific origins and headers
# app.add_middleware(
#     # CORSMiddleware,
#     # allow_origins=["https://suspect-detection-model-up-police-3quj72n5c-wt-pbl.vercel.app"],
#     # allow_credentials=True,
#     # allow_methods=["POST", "OPTIONS"],
#     # allow_headers=["*"],
#       CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["POST", "OPTIONS", "GET"],  # Make sure GET and other methods are included if needed
#     allow_headers=["*"],  # Allow all headers
# )

# # Load OpenCV face cascade
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# @app.post("/detect-emotion/")
# async def predict(file: UploadFile = File(...)):
#     try:
#         contents = await file.read()
#         np_img = np.frombuffer(contents, np.uint8)
#         img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
#         gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         rgb = cv2.cvtColor(gray, cv2.COLOR_GRAY2RGB)

#         faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
#         emotions = [DeepFace.analyze(rgb[y:y+h, x:x+w], actions=['emotion'], enforce_detection=False)[0]['dominant_emotion'] for (x, y, w, h) in faces]

#         return JSONResponse(content={"emotions": emotions})
#     except Exception as e:
#         return JSONResponse(content={"error": str(e)}, status_code=500)

# # Handle CORS preflight requests explicitly
# @app.options("/detect-emotion/")
# async def options_handler():
#     return JSONResponse(
#         content={"message": "CORS Preflight OK"},
#         headers={
#         #     "Access-Control-Allow-Origin": "https://suspect-detection-model-up-police-3quj72n5c-wt-pbl.vercel.app",
#         #     "Access-Control-Allow-Methods": "POST, OPTIONS",
#         #     "Access-Control-Allow-Headers": "Content-Type"
#         # }
#           "Access-Control-Allow-Origin": "*",  # You can also allow all origins for testing
#             "Access-Control-Allow-Methods": "GET, POST, OPTIONS,PUT",
#             "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
#         }
#     )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI, File, UploadFile
import cv2
import numpy as np
from io import BytesIO
from deepface import DeepFace
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Initialize FastAPI app
app = FastAPI()

# Configure CORS more comprehensively
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add both localhost and IP
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    max_age=600,  # Cache preflight requests for 10 minutes
)

# Load OpenCV face cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.post("/detect-emotion/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read image from request
        contents = await file.read()
        np_img = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        rgb = cv2.cvtColor(gray, cv2.COLOR_GRAY2RGB)

        # Detect faces
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        emotions = []
        for (x, y, w, h) in faces:
            face_roi = rgb[y:y + h, x:x + w]

            # Perform emotion analysis
            result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
            dominant_emotion = result[0]['dominant_emotion']
            emotions.append(dominant_emotion)

            print(f"Emotions detected: {emotions}")

        return {"emotions": emotions}  # Simplified response without manual CORS headers
    
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

