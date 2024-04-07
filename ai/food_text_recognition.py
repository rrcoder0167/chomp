# food_text_recognition.py
import sys
from PIL import Image
import pytesseract
import cv2
import re
import requests
import numpy as np

def extract_total_sugars(image_url):
    response = requests.get(image_url)
    image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    # Convert the image to gray scale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Use Tesseract to do OCR on the image
    text = pytesseract.image_to_string(gray)

    # Print the text
    def search_total_sugars(text):
        pattern = r"Total Sugars (.*?)\n"
        match = re.search(pattern, text)
        
        if match:
            return match.group(1)
        else:
            return None
    
    total_sugars = search_total_sugars(text)
    return total_sugars

if __name__ == "__main__":
    image_url = sys.argv[1]
    print(extract_total_sugars(image_url))