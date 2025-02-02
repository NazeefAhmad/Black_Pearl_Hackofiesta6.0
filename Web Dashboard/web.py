# # # import firebase_admin
# # # from firebase_admin import credentials, db
# # # from aiortc import RTCPeerConnection, VideoStreamTrack
# # # import asyncio
# # # import base64
# # # import cv2
# # # from ultralytics import YOLO
# # # import numpy as np
# # # import logging

# # # # Set up logging
# # # logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# # # # Initialize Firebase if not already initialized
# # # if not firebase_admin._apps:
# # #     cred = credentials.Certificate("/Users/nazeef/Developer/UP_Police/sadam-sdm-firebase-adminsdk-fbsvc-1f50f85a8d.json")

# # #    # cred = credentials.Certificate("/UP_Police/sadam-sdm-firebase-adminsdk-fbsvc-1f50f85a8d.json")
# # #     firebase_admin.initialize_app(cred, {"databaseURL": "https://sadam-sdm-default-rtdb.asia-southeast1.firebasedatabase.app/"})
# # #     logging.info("Firebase app initialized.")
# # # else:
# # #     logging.info("Firebase app is already initialized.")

# # # # Load the YOLOv8 model
# # # model = YOLO('yolov8s.pt')  # Use the correct model path
# # # logging.info("YOLO model loaded.")

# # # # VideoStreamTrack to handle video frames
# # # class VideoStream(VideoStreamTrack):
# # #     def __init__(self, frame_generator):
# # #         super().__init__()  # Initialize VideoStreamTrack
# # #         self.frame_generator = frame_generator
# # #         logging.debug("VideoStream initialized.")

# # #     async def recv(self):
# # #         frame = self.frame_generator()  # Get the next frame
# # #         if frame is None:
# # #             logging.error("No frame available.")
# # #             raise Exception("No frame available")
# # #         return frame

# # # def generate_frame():
# # #     """Capture frame, apply YOLO object detection and return base64 encoded image."""
# # #     def get_frame():
# # #         frame_data = eval_js('canvas.toDataURL("image/jpeg", 0.8);')  # Colab JS to get frame in base64
# # #         img_array = np.frombuffer(base64.b64decode(frame_data), dtype=np.uint8)
# # #         img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

# # #         # Perform YOLO detection
# # #         img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# # #         results = model(img_rgb, conf=0.25, iou=0.45)

# # #         # Draw bounding boxes on the frame
# # #         for r in results:
# # #             for box in r.boxes:
# # #                 x1, y1, x2, y2 = map(int, box.xyxy[0])
# # #                 cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)

# # #         # Encode frame as base64 JPEG
# # #         _, buffer = cv2.imencode('.jpg', img)
# # #         frame_data = base64.b64encode(buffer).decode('utf-8')
# # #         logging.debug("Frame processed and encoded.")
# # #         return frame_data

# # #     return get_frame

# # # # Set up Firebase signaling functions
# # # def save_offer(offer):
# # #     db.reference("feed/offer").set(offer)
# # #     logging.info("Offer saved to Firebase.")

# # # def save_answer(answer):
# # #     db.reference("feed/answer").set(answer)
# # #     logging.info("Answer saved to Firebase.")

# # # def get_answer():
# # #     return db.reference("feed/answer").get()

# # # def firebase_listener():
# # #     """Listen for the answer from Firebase in real-time"""
# # #     ref = db.reference('feed/answer')
# # #     ref.listen(lambda event: on_answer_received(event))

# # # def on_answer_received(event):
# # #     """Called when the answer is received from Firebase"""
# # #     answer = event.data
# # #     logging.info(f"Answer received from Firebase: {answer}")
# # #     if answer:
# # #         asyncio.ensure_future(set_remote_description(answer))

# # # async def set_remote_description(answer):
# # #     """Set remote description once answer is received from Firebase"""
# # #     pc = RTCPeerConnection()
# # #     await pc.setRemoteDescription(answer)

# # #     # Now we can start the connection
# # #     logging.info("Connection established!")
# # #     return pc

# # # # Function to create a WebRTC connection
# # # async def create_connection():
# # #     frame_gen = generate_frame()
# # #     pc = RTCPeerConnection()

# # #     # Add Video Track
# # #     pc.addTrack(VideoStream(frame_gen))
# # #     logging.debug("Video track added.")

# # #     # Create offer and save it to Firebase
# # #     offer = await pc.createOffer()
# # #     await pc.setLocalDescription(offer)

# # #     # Serialize offer manually before saving
# # #     offer_data = {
# # #         "type": pc.localDescription.type,
# # #         "sdp": pc.localDescription.sdp
# # #     }
# # #     save_offer(offer_data)  # Save the offer as a dictionary with 'type' and 'sdp'

# # #     # Start listening for answer from Firebase
# # #     firebase_listener()

# # #     logging.debug("Waiting for answer from Firebase...")
# # #     return pc

# # # # Start WebRTC connection
# # # def start_webrtc():
# # #     # Get the current running loop in Colab (if any) or create a new one
# # #     loop = asyncio.get_event_loop()  # Get the existing event loop

# # #     # Ensure create_connection() is executed within the existing loop
# # #     loop.create_task(create_connection())
# # #     logging.info("WebRTC connection started.")

# # # # Start the WebRTC connection process
# # # start_webrtc()


# # import firebase_admin
# # from firebase_admin import credentials, db
# # from aiortc import RTCPeerConnection, VideoStreamTrack
# # import asyncio
# # import base64
# # import cv2
# # from ultralytics import YOLO
# # import numpy as np
# # import logging

# # # Set up logging
# # logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# # # Initialize Firebase if not already initialized
# # if not firebase_admin._apps:
# #     cred = credentials.Certificate("/Users/nazeef/Developer/UP_Police/sadam-sdm-firebase-adminsdk-fbsvc-1f50f85a8d.json")
# #     firebase_admin.initialize_app(cred, {"databaseURL": "https://sadam-sdm-default-rtdb.asia-southeast1.firebasedatabase.app/"})
# #     logging.info("Firebase app initialized.")
# # else:
# #     logging.info("Firebase app is already initialized.")

# # # Load the YOLOv8 model
# # model = YOLO('yolov8s.pt')  # Use the correct model path
# # logging.info("YOLO model loaded.")

# # # VideoStreamTrack to handle video frames
# # class VideoStream(VideoStreamTrack):
# #     def __init__(self, frame_generator):
# #         super().__init__()  # Initialize VideoStreamTrack
# #         self.frame_generator = frame_generator
# #         logging.debug("VideoStream initialized.")

# #     async def recv(self):
# #         frame = await asyncio.to_thread(self.frame_generator)  # Ensure continuous fetching of frames
# #         if frame is None:
# #             logging.error("No frame available.")
# #             raise Exception("No frame available")
# #         return frame

# # def generate_frame():
# #     """Capture frame, apply YOLO object detection and show in OpenCV window."""
# #     def get_frame():
# #         while True:
# #             frame_data = eval_js('canvas.toDataURL("image/jpeg", 0.8);')  # Continuously get frames from canvas
# #             img_array = np.frombuffer(base64.b64decode(frame_data), dtype=np.uint8)
# #             img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

# #             # Perform YOLO detection
# #             img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# #             results = model(img_rgb, conf=0.25, iou=0.45)

# #             # Draw bounding boxes on the frame
# #             for r in results:
# #                 for box in r.boxes:
# #                     x1, y1, x2, y2 = map(int, box.xyxy[0])
# #                     cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)

# #             # Show the frame in an OpenCV window
# #             cv2.imshow("YOLO Video Feed", img)  # Show the frame
# #             cv2.waitKey(1)  # Add a small delay to update the frame (1 ms)

# #             yield img  # You can return the frame here as well

# #     return get_frame

# # # Set up Firebase signaling functions
# # def save_offer(offer):
# #     db.reference("feed/offer").set(offer)
# #     logging.info("Offer saved to Firebase.")

# # def save_answer(answer):
# #     db.reference("feed/answer").set(answer)
# #     logging.info("Answer saved to Firebase.")

# # def get_answer():
# #     return db.reference("feed/answer").get()

# # def firebase_listener():
# #     """Listen for the answer from Firebase in real-time"""
# #     ref = db.reference('feed/answer')
# #     ref.listen(lambda event: on_answer_received(event))

# # def on_answer_received(event):
# #     """Called when the answer is received from Firebase"""
# #     answer = event.data
# #     logging.info(f"Answer received from Firebase: {answer}")
# #     if answer:
# #         asyncio.ensure_future(set_remote_description(answer))

# # async def set_remote_description(answer):
# #     """Set remote description once answer is received from Firebase"""
# #     pc = RTCPeerConnection()
# #     await pc.setRemoteDescription(answer)

# #     # Now we can start the connection
# #     logging.info("Connection established!")
# #     return pc

# # # Function to create a WebRTC connection
# # async def create_connection():
# #     frame_gen = generate_frame()
# #     pc = RTCPeerConnection()

# #     # Add Video Track
# #     pc.addTrack(VideoStream(frame_gen))
# #     logging.debug("Video track added.")

# #     # Create offer and save it to Firebase
# #     offer = await pc.createOffer()
# #     await pc.setLocalDescription(offer)

# #     # Serialize offer manually before saving
# #     offer_data = {
# #         "type": pc.localDescription.type,
# #         "sdp": pc.localDescription.sdp
# #     }
# #     save_offer(offer_data)  # Save the offer as a dictionary with 'type' and 'sdp'

# #     # Start listening for answer from Firebase
# #     firebase_listener()

# #     logging.debug("Waiting for answer from Firebase...")
# #     return pc

# # # Start WebRTC connection
# # def start_webrtc():
# #     # Get the current running loop in Colab (if any) or create a new one
# #     loop = asyncio.get_event_loop()  # Get the existing event loop

# #     # Ensure create_connection() is executed within the existing loop
# #     loop.create_task(create_connection())
# #     logging.info("WebRTC connection started.")

# # # Start the WebRTC connection process
# # start_webrtc()

# # # Keep OpenCV window open to display frames
# # cv2.destroyAllWindows()  # Ensure the window is properly closed at the end


# import cv2
# import asyncio
# import logging
# import firebase_admin
# from firebase_admin import credentials, db
# from aiortc import RTCPeerConnection, RTCSessionDescription, VideoStreamTrack

# # Logging Configuration
# logging.basicConfig(level=logging.INFO)

# # Firebase Initialization
# def initialize_firebase():
#     try:
#         # Replace with your Firebase credentials path
#         cred = credentials.Certificate("/Users/nazeef/Developer/UP_Police/sadam-sdm-firebase-adminsdk-fbsvc-1f50f85a8d.json")
#         firebase_admin.initialize_app(cred, {
#             'databaseURL': 'https://sadam-sdm-default-rtdb.asia-southeast1.firebasedatabase.app/'
#         })
#         return db.reference('webrtc_stream')
#     except Exception as e:
#         logging.error(f"Firebase initialization error: {e}")
#         return None

# # Video Capture Track
# class WebRTCVideoTrack(VideoStreamTrack):
#     def __init__(self, camera_index=0):
#         super().__init__()
#         self.camera = cv2.VideoCapture(camera_index)
        
#     async def recv(self):
#         ret, frame = self.camera.read()
#         if not ret:
#             raise Exception("Camera frame capture failed")
        
#         # Optional frame processing
#         frame = cv2.resize(frame, (640, 480))
        
#         _, buffer = cv2.imencode('.jpg', frame)
#         return buffer.tobytes()

# # WebRTC Connection Management
# class WebRTCStreamManager:
#     def __init__(self, firebase_ref):
#         self.firebase_ref = firebase_ref
#         self.pc = None
        
#     async def create_offer(self):
#         try:
#             self.pc = RTCPeerConnection()
#             video_track = WebRTCVideoTrack()
#             self.pc.addTrack(video_track)
            
#             offer = await self.pc.createOffer()
#             await self.pc.setLocalDescription(offer)
            
#             # Store offer in Realtime Database
#             offers_ref = self.firebase_ref.child('offers')
#             offers_ref.push({
#                 'sdp': offer.sdp,
#                 'type': offer.type
#             })
            
#             logging.info("WebRTC offer created and stored")
#         except Exception as e:
#             logging.error(f"Offer creation error: {e}")
    
#     async def handle_answer(self, answer_data):
#         try:
#             if not self.pc:
#                 logging.warning("No peer connection established")
#                 return
            
#             answer = RTCSessionDescription(
#                 sdp=answer_data['sdp'], 
#                 type=answer_data['type']
#             )
#             await self.pc.setRemoteDescription(answer)
#             logging.info("Remote answer processed")
#         except Exception as e:
#             logging.error(f"Answer processing error: {e}")
    
#     async def handle_ice_candidates(self, candidate_data):
#         try:
#             if not self.pc:
#                 logging.warning("No peer connection for ICE candidate")
#                 return
            
#             await self.pc.addIceCandidate(candidate_data)
#             logging.info("ICE candidate added")
#         except Exception as e:
#             logging.error(f"ICE candidate error: {e}")

# # Main Async Execution
# async def main():
#     firebase_ref = initialize_firebase()
#     if not firebase_ref:
#         logging.error("Firebase setup failed")
#         return
    
#     stream_manager = WebRTCStreamManager(firebase_ref)
    
#     # Create initial offer
#     await stream_manager.create_offer()
    
#     # Answers listener
#     def on_answer(snapshot):
#         answer_data = snapshot.val()
#         if answer_data:
#             asyncio.create_task(stream_manager.handle_answer(answer_data))
    
#     firebase_ref.child('answers').on_child_added(on_answer)
    
#     # ICE Candidates listener
#     def on_candidate(snapshot):
#         candidate_data = snapshot.val()
#         if candidate_data:
#             asyncio.create_task(stream_manager.handle_ice_candidates(candidate_data))
    
#     firebase_ref.child('ice_candidates').on_child_added(on_candidate)
    
#     # Keep the script running
#     await asyncio.Event().wait()

# if __name__ == "__main__":
#     asyncio.run(main())


# import cv2
# import asyncio
# import logging
# import firebase_admin
# from firebase_admin import credentials, db
# from aiortc import RTCPeerConnection, RTCSessionDescription, VideoStreamTrack

# # Logging Configuration
# logging.basicConfig(level=logging.INFO)

# # Global Firebase reference
# firebase_ref = None

# # Firebase Initialization
# def initialize_firebase():
#     global firebase_ref
#     try:
#         # Replace with your Firebase credentials path
#         cred = credentials.Certificate("/Users/nazeef/Developer/UP_Police/sadam-sdm-firebase-adminsdk-fbsvc-1f50f85a8d.json")
#         firebase_admin.initialize_app(cred, {
#             'databaseURL': 'https://sadam-sdm-default-rtdb.asia-southeast1.firebasedatabase.app/'
#         })
#         firebase_ref = db.reference('webrtc_stream')
#     except Exception as e:
#         logging.error(f"Firebase initialization error: {e}")
#         firebase_ref = None

# # Video Capture Track
# class WebRTCVideoTrack(VideoStreamTrack):
#     def __init__(self, camera_index=0):
#         super().__init__()
#         self.camera = cv2.VideoCapture(camera_index)
        
#     async def recv(self):
#         ret, frame = self.camera.read()
#         if not ret:
#             raise Exception("Camera frame capture failed")
        
#         # Optional frame processing
#         frame = cv2.resize(frame, (640, 480))
        
#         _, buffer = cv2.imencode('.jpg', frame)
#         return buffer.tobytes()

#     def __del__(self):
#         if self.camera.isOpened():
#             self.camera.release()

# # WebRTC Connection Management
# class WebRTCStreamManager:
#     def __init__(self, firebase_ref):
#         self.firebase_ref = firebase_ref
#         self.pc = None
        
#     async def create_offer(self):
#         try:
#             self.pc = RTCPeerConnection()
#             video_track = WebRTCVideoTrack()
#             self.pc.addTrack(video_track)
            
#             offer = await self.pc.createOffer()
#             await self.pc.setLocalDescription(offer)
            
#             # Store offer in Realtime Database
#             offers_ref = self.firebase_ref.child('offers')
#             offers_ref.push({
#                 'sdp': offer.sdp,
#                 'type': offer.type
#             })
            
#             logging.info("WebRTC offer created and stored")
#         except Exception as e:
#             logging.error(f"Offer creation error: {e}")
    
#     async def handle_answer(self, answer_data):
#         try:
#             if not self.pc:
#                 logging.warning("No peer connection established")
#                 return
            
#             answer = RTCSessionDescription(
#                 sdp=answer_data['sdp'], 
#                 type=answer_data['type']
#             )
#             await self.pc.setRemoteDescription(answer)
#             logging.info("Remote answer processed")
#         except Exception as e:
#             logging.error(f"Answer processing error: {e}")
    
#     async def handle_ice_candidates(self, candidate_data):
#         try:
#             if not self.pc:
#                 logging.warning("No peer connection for ICE candidate")
#                 return
            
#             await self.pc.addIceCandidate(candidate_data)
#             logging.info("ICE candidate added")
#         except Exception as e:
#             logging.error(f"ICE candidate error: {e}")

#     async def close(self):
#         if self.pc:
#             await self.pc.close()
#             logging.info("WebRTC connection closed")

# # Periodic polling for updates in Firebase
# async def poll_firebase():
#     global firebase_ref
#     while True:
#         try:
#             # Check for answers
#             if firebase_ref:
#                 answers_ref = firebase_ref.child('answers')
#                 answers_snapshot = answers_ref.get()
#                 if answers_snapshot:
#                     for answer_data in answers_snapshot.values():
#                         asyncio.create_task(stream_manager.handle_answer(answer_data))
            
#             # Check for ICE candidates
#             if firebase_ref:
#                 ice_candidates_ref = firebase_ref.child('ice_candidates')
#                 candidates_snapshot = ice_candidates_ref.get()
#                 if candidates_snapshot:
#                     for candidate_data in candidates_snapshot.values():
#                         asyncio.create_task(stream_manager.handle_ice_candidates(candidate_data))

#         except Exception as e:
#             logging.error(f"Error while polling Firebase: {e}")
        
#         # Wait for a while before polling again (e.g., every 5 seconds)
#         await asyncio.sleep(5)

# # Main Async Execution
# async def main():
#     global firebase_ref, stream_manager
#     initialize_firebase()
    
#     if not firebase_ref:
#         logging.error("Firebase setup failed")
#         return
    
#     stream_manager = WebRTCStreamManager(firebase_ref)
    
#     # Create initial offer
#     await stream_manager.create_offer()
    
#     # Start polling Firebase for updates
#     await poll_firebase()

# if __name__ == "__main__":
#     asyncio.run(main())

import asyncio
import logging
import websockets
import json
import firebase_admin
from firebase_admin import credentials, db
from aiortc import RTCPeerConnection, RTCSessionDescription, VideoStreamTrack

# Logging Configuration
logging.basicConfig(level=logging.INFO)

# Global Firebase reference
firebase_ref = None

# Firebase Initialization
def initialize_firebase():
    global firebase_ref
    try:
        # Replace with your Firebase credentials path
        cred = credentials.Certificate("/Users/nazeef/Developer/UP_Police/sadam-sdm-firebase-adminsdk-fbsvc-1f50f85a8d.json")
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://sadam-sdm-default-rtdb.asia-southeast1.firebasedatabase.app/'
        })
        firebase_ref = db.reference('webrtc_stream')
    except Exception as e:
        logging.error(f"Firebase initialization error: {e}")
        firebase_ref = None

# Video Capture Track
class WebRTCVideoTrack(VideoStreamTrack):
    def __init__(self, camera_index=0):
        super().__init__()
        self.camera = cv2.VideoCapture(camera_index)
        
    async def recv(self):
        ret, frame = self.camera.read()
        if not ret:
            raise Exception("Camera frame capture failed")
        
        # Optional frame processing
        frame = cv2.resize(frame, (640, 480))
        
        _, buffer = cv2.imencode('.jpg', frame)
        return buffer.tobytes()

    def __del__(self):
        if self.camera.isOpened():
            self.camera.release()

# WebRTC Connection Management
class WebRTCStreamManager:
    def __init__(self, firebase_ref):
        self.firebase_ref = firebase_ref
        self.pc = None

    async def create_offer(self):
        try:
            self.pc = RTCPeerConnection()
            video_track = WebRTCVideoTrack()
            self.pc.addTrack(video_track)
            
            offer = await self.pc.createOffer()
            await self.pc.setLocalDescription(offer)
            
            # Store offer in Realtime Database (Firebase)
            offers_ref = self.firebase_ref.child('offers')
            offers_ref.push({
                'sdp': offer.sdp,
                'type': offer.type
            })
            
            logging.info("WebRTC offer created and stored")
            return offer
        except Exception as e:
            logging.error(f"Offer creation error: {e}")
    
    async def handle_answer(self, answer_data):
        try:
            if not self.pc:
                logging.warning("No peer connection established")
                return
            
            answer = RTCSessionDescription(
                sdp=answer_data['sdp'], 
                type=answer_data['type']
            )
            await self.pc.setRemoteDescription(answer)
            logging.info("Remote answer processed")
        except Exception as e:
            logging.error(f"Answer processing error: {e}")
    
    async def handle_ice_candidates(self, candidate_data):
        try:
            if not self.pc:
                logging.warning("No peer connection for ICE candidate")
                return
            
            await self.pc.addIceCandidate(candidate_data)
            logging.info("ICE candidate added")
        except Exception as e:
            logging.error(f"ICE candidate error: {e}")

    async def close(self):
        if self.pc:
            await self.pc.close()
            logging.info("WebRTC connection closed")

# WebSocket Signaling Handler
async def signaling_handler(websocket, path):
    global stream_manager

    try:
        # Initial WebRTC offer
        offer = await stream_manager.create_offer()
        await websocket.send(json.dumps({
            'type': 'offer',
            'sdp': offer.sdp
        }))

        # Receive answer from client
        answer_data = await websocket.recv()
        answer = json.loads(answer_data)
        await stream_manager.handle_answer(answer)
        
        # Receive ICE candidates from client
        while True:
            candidate_data = await websocket.recv()
            candidate = json.loads(candidate_data)
            await stream_manager.handle_ice_candidates(candidate)
    
    except Exception as e:
        logging.error(f"Error in signaling: {e}")

# Start WebSocket server
async def start_signaling_server():
    server = await websockets.serve(signaling_handler, 'localhost', 8765)
    logging.info("WebSocket server started at ws://localhost:8765")
    await server.wait_closed()

# Periodic polling for updates in Firebase
async def poll_firebase():
    global firebase_ref
    while True:
        try:
            # Check for answers
            if firebase_ref:
                answers_ref = firebase_ref.child('answers')
                answers_snapshot = answers_ref.get()
                if answers_snapshot:
                    for answer_data in answers_snapshot.values():
                        asyncio.create_task(stream_manager.handle_answer(answer_data))
            
            # Check for ICE candidates
            if firebase_ref:
                ice_candidates_ref = firebase_ref.child('ice_candidates')
                candidates_snapshot = ice_candidates_ref.get()
                if candidates_snapshot:
                    for candidate_data in candidates_snapshot.values():
                        asyncio.create_task(stream_manager.handle_ice_candidates(candidate_data))

        except Exception as e:
            logging.error(f"Error while polling Firebase: {e}")
        
        # Wait for a while before polling again (e.g., every 5 seconds)
        await asyncio.sleep(5)

# Main Async Execution
async def main():
    global firebase_ref, stream_manager
    initialize_firebase()
    
    if not firebase_ref:
        logging.error("Firebase setup failed")
        return
    
    stream_manager = WebRTCStreamManager(firebase_ref)
    
    # Start the WebSocket signaling server
    asyncio.create_task(start_signaling_server())
    
    # Start polling Firebase for updates
    await poll_firebase()

if __name__ == "__main__":
    asyncio.run(main())
