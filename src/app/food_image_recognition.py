import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

model = tf.keras.models.load_model('/Users/riddhiman.rana/Desktop/Coding/chomp/food_101_model.h5')

class_names = ['Coke', 'Doritos', 'Oranges', 'Oreos', 'Seven Up', 'Sprite']  # Define your class names

# Function to predict food from an image
def predict_food(image_path):
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    print(predictions)
    print(
        "This image most likely belongs to {} with a {:.2f} percent confidence."
        .format(class_names[np.argmax(score)], 100 * np.max(score))
    )
    
predict_food('/Users/riddhiman.rana/Desktop/Coding/chomp/public/images/seven_up.jpeg')