from createModel import LRCNModel
import os
from predictShortVid import process_live_video
# Define the model
lrcModel = LRCNModel(20, 64, 64, 2)
model = lrcModel.create_model()
model.load_weights('Models/ViolenceModelFinal.keras')

# Parameters
camera_index = 1  # Adjust as needed
segment_duration = 10  # Duration in seconds for each segment
output_directory = 'CrimeVid'
SEQUENCE_LENGTH = 20  # Number of frames used by the model for predictions

# Ensure output directory exists
os.makedirs(output_directory, exist_ok=True)

while True:
    process_live_video(camera_index, segment_duration, model, output_directory, SEQUENCE_LENGTH)
    # Add a delay or any other necessary processing

# from openCv import predict_single_action

# predict_single_action('test_results\div-dip-test.mp4', 20, model)