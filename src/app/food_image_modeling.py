import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load pre-trained MobileNetV2
base_model = MobileNetV2(weights='imagenet', include_top=False, pooling='avg')

# Add a new top layer
x = base_model.output
predictions = Dense(5, activation='softmax')(x)  # Change from 5 to 6
model = Model(inputs=base_model.input, outputs=predictions)

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Prepare data
train_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_directory('/Users/riddhiman.rana/Desktop/Coding/chomp/public/images', target_size=(224, 224), batch_size=32, class_mode='categorical')

# Train the model
model.fit(train_generator, epochs=10)

# Save the model
model.save('./food_model.keras')