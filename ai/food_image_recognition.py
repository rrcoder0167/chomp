import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

model = tf.keras.models.load_model('/Users/riddhiman.rana/Desktop/Coding/chomp/food_model.keras')

class_names = ['Coke', 'Oranges']  # Define your class names

def predict_food(image_path):
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(150, 150))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255

    predictions = model.predict(img_array)
    score = predictions[0]
    class_index = np.argmax(score)
    class_name = class_names[class_index]

    print(f'Predicted class: {class_name}')
    print(f'Confidence: {score[class_index]}')
predict_food('/Users/riddhiman.rana/Desktop/Coding/chomp/ai/test_data/image.png')