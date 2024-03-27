from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
import os
import numpy as np
from keras.models import load_model
from PIL import Image, ImageOps
import tempfile

app = FastAPI()

# Load diagnosis model and class names
diagnosis_model_path = "/content/drive/MyDrive/Parkinson_DL/Diagnosis/Models/diagnosis.h5"
diagnosis_class_names_path = "/content/drive/MyDrive/Parkinson_DL/Diagnosis/Models/d2.txt"

if not os.path.exists(diagnosis_model_path) or not os.path.exists(diagnosis_class_names_path):
    raise FileNotFoundError("Diagnosis model or class names file not found.")

diagnosis_model = load_model(diagnosis_model_path, compile=False)
diagnosis_class_names = [line.strip() for line in open(diagnosis_class_names_path, "r").readlines()]

# Load detection model and class names
detection_model_path = "/content/drive/MyDrive/Parkinson_DL/Detection/Models/detection.h5"
detection_class_names_path = "/content/drive/MyDrive/Parkinson_DL/Detection/Models/d1.txt"

if not os.path.exists(detection_model_path) or not os.path.exists(detection_class_names_path):
    raise FileNotFoundError("Detection model or class names file not found.")

detection_model = load_model(detection_model_path, compile=False)
detection_class_names = [line.strip() for line in open(detection_class_names_path, "r").readlines()]

@app.post("/Diagnosis")
async def diagnose_image(file: UploadFile = File(...)):
    # Verify uploaded file is an image
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=415, detail="Unsupported Media Type")

    # Create a temporary directory to save the uploaded image
    with tempfile.TemporaryDirectory() as tmpdirname:
        # Save the uploaded image to the temporary directory
        file_path = os.path.join(tmpdirname, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Preprocess the image for diagnosis
        image = Image.open(file_path).convert("RGB")
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array

        # Predict the image using the diagnosis model
        prediction = diagnosis_model.predict(data)
        index = np.argmax(prediction)
        class_name = diagnosis_class_names[index]
        confidence_score = float(prediction[0][index])

        # Return diagnosis result
        return {"task": "diagnosis", "class_name": class_name, "confidence_score": confidence_score}

@app.post("/Detection")
async def detect_image(file: UploadFile = File(...)):
    # Verify uploaded file is an image
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=415, detail="Unsupported Media Type")

    # Create a temporary directory to save the uploaded image
    with tempfile.TemporaryDirectory() as tmpdirname:
        # Save the uploaded image to the temporary directory
        file_path = os.path.join(tmpdirname, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Preprocess the image for detection
        image = Image.open(file_path).convert("RGB")
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array

        # Predict the image using the detection model
        prediction = detection_model.predict(data)
        index = np.argmax(prediction)
        class_name = detection_class_names[index]
        confidence_score = float(prediction[0][index])

        # Return detection result
        return {"task": "detection", "class_name": class_name, "confidence_score": confidence_score}
