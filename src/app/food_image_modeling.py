# 1. Import necessary libraries
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import VGG16

# 2. Load and preprocess your data
# Assuming you have two folders 'orange' and 'coke_can' with respective images
train_datagen = ImageDataGenerator(rescale=1./255, rotation_range=40, width_shift_range=0.2,
                                   height_shift_range=0.2, shear_range=0.2, zoom_range=0.2,
                                   horizontal_flip=True, fill_mode='nearest')
train_generator = train_datagen.flow_from_directory(
        '/Users/riddhiman.rana/Desktop/Coding/chomp/public/images/training',
        target_size=(150, 150),
        batch_size=20,
        class_mode='binary')

# 3. Define your model
conv_base = VGG16(weights='imagenet', include_top=False, input_shape=(150, 150, 3))

model = Sequential()
model.add(conv_base)
model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(1, activation='sigmoid'))

# Freeze the convolutional base
conv_base.trainable = False

# 4. Compile your model
model.compile(loss='binary_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

# 5. Train your model
history = model.fit(
      train_generator,
      steps_per_epoch=100,
      epochs=30)

# 6. Evaluate your model
# Load your validation data similar to train data and use model.evaluate()