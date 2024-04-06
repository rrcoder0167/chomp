import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

model = tf.keras.models.load_model('/Users/riddhiman.rana/Desktop/Coding/chomp/food_model.keras')

class_names = ['Coke', 'Doritos', 'Oranges', 'Oreos', 'Seven Up', 'Sprite']  # Define your class names

# Function to predict food from an image
def predict_food(image_path):
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch

    predictions = model.predict(img_array)
    print(predictions)
    
    # Get the index of the class with the highest prediction value
    predicted_class = np.argmax(predictions[0])
    
    print(
        "This image most likely belongs to {} with a {:.2f} percent confidence."
        .format(class_names[predicted_class], 100 * predictions[0][predicted_class])
    )
    
predict_food('/Users/riddhiman.rana/Desktop/Coding/chomp/public/images/cokebottle.jpg')