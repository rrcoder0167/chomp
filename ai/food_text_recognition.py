from PIL import Image
import pytesseract
import cv2

# Load the image from a file
image = cv2.imread('/Users/riddhiman.rana/Desktop/Coding/chomp/ai/test_data/coke.jpeg')

# Convert the image to gray scale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Use Tesseract to do OCR on the image
text = pytesseract.image_to_string(gray)

# Print the text
print(text)