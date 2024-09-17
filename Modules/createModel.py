from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import TimeDistributed, Conv2D, MaxPooling2D, Dropout, Flatten, LSTM, Dense

class LRCNModel:
    def __init__(self, sequence_length, image_height, image_width, num_classes):
        '''
        Initializes the LRCNModel class with the given parameters.
        
        Args:
            sequence_length (int): Length of the input sequences.
            image_height (int): Height of the input images.
            image_width (int): Width of the input images.
            num_classes (int): Number of output classes for classification.
        '''
        self.sequence_length = sequence_length
        self.image_height = image_height
        self.image_width = image_width
        self.num_classes = num_classes

    def create_model(self):
        '''
        Constructs and returns the LRCN model.
        
        Returns:
            model: The constructed LRCN model.
        '''
        model = Sequential()

        # Define the Model Architecture.
        ########################################################################################################################

        model.add(TimeDistributed(Conv2D(16, (3, 3), padding='same', activation='relu'),
                                  input_shape=(self.sequence_length, self.image_height, self.image_width, 3)))
        model.add(TimeDistributed(MaxPooling2D((4, 4))))
        model.add(TimeDistributed(Dropout(0.25)))

        model.add(TimeDistributed(Conv2D(32, (3, 3), padding='same', activation='relu')))
        model.add(TimeDistributed(MaxPooling2D((4, 4))))
        model.add(TimeDistributed(Dropout(0.25)))

        model.add(TimeDistributed(Conv2D(64, (3, 3), padding='same', activation='relu')))
        model.add(TimeDistributed(MaxPooling2D((2, 2))))
        model.add(TimeDistributed(Dropout(0.25)))

        model.add(TimeDistributed(Conv2D(64, (3, 3), padding='same', activation='relu')))
        model.add(TimeDistributed(MaxPooling2D((2, 2))))
        # model.add(TimeDistributed(Dropout(0.25)))

        model.add(TimeDistributed(Flatten()))

        model.add(LSTM(32))

        model.add(Dense(self.num_classes, activation='softmax'))

        ########################################################################################################################

        # Display the model's summary.
        # model.summary()

        # Return the constructed LRCN model.
        return model

# Example usage:
# Assuming you have the values for SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH, and CLASSES_LIST
# SEQUENCE_LENGTH = 10
# IMAGE_HEIGHT = 64
# IMAGE_WIDTH = 64
# CLASSES_LIST = ['class1', 'class2', 'class3']
# num_classes = len(CLASSES_LIST)

# lrcn = LRCNModel(sequence_length=SEQUENCE_LENGTH, image_height=IMAGE_HEIGHT, image_width=IMAGE_WIDTH, num_classes=num_classes)
# model = lrcn.create_model()
