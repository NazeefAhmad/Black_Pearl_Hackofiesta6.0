# 👮 Crime Detection Module
Part of the [Black Pearl Surveillance System](../README.md)

## Overview
Criminal recognition system using face recognition and deep learning. Detects known criminals from CCTV feeds and maintains a database of criminal records.

## Features
- Criminal face recognition
- Database of criminal records
- Real-time CCTV integration
- Alert system

## Dependencies
```bash
opencv-python
face-recognition
deepface
numpy
pymongo
psycopg2
```

## Setup
1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run criminal recognition:
```bash
python criminal_recognition.py
```

## Database Structure
Uses local folder structure for criminal database:
```
criminals/
├── person1/
│   ├── image1.jpg
│   └── image2.jpg
├── person2/
    └── image1.jpg
```

## Usage
The system:
1. Loads criminal database
2. Processes video feed
3. Matches faces against database
4. Generates alerts for matches
