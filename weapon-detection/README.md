# 🔫 Weapon Detection Module
Part of the [Black Pearl Surveillance System](../README.md)

## Overview
Real-time weapon detection system using YOLOv8, integrated with the surveillance system.

## Features
- Real-time weapon detection
- Multiple weapon class recognition
- CCTV feed integration
- Alert system

## Dependencies
```bash
ultralytics
wandb
opencv-python
```

## Setup
1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run detection:
```bash
python weapon-detection-yolov8.py
```

## Model Training
The system uses YOLOv8:
```python
# Train model
model = YOLO('yolov8n.pt')
results = model.train(data=data_yaml_path, epochs=20)

# Run detection
model = YOLO('runs/detect/train/weights/best.pt')
```

## Integration
- Connects to main dashboard
- Real-time alerts
- Supports multiple CCTV feeds
