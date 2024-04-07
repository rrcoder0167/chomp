from PIL import Image
import pytesseract
import cv2
import re

# Load the image from a file
image = cv2.imread('/Users/riddhiman.rana/Desktop/Coding/chomp/ai/test_data/cheetoh stuff.jpeg')

# Convert the image to gray scale
#gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Use Tesseract to do OCR on the image
text = pytesseract.image_to_string(image)

# Print the text
print(text)

def search_total_sugars(text):
    # Search for the pattern "Total Sugars {anything here}\n"
    pattern = r"Total Sugars (.*?)\n"
    match = re.search(pattern, text)
    
    if match:
        total_sugars = match.group(1)
        return total_sugars
    else:
        return None

# Call the function with the extracted text
total_sugars = search_total_sugars(text)
if total_sugars:
    print("Food Total Sugar Quantity:", total_sugars)
else:
    print("Total Sugars not found.")
