import os
import time
from captureShortVid import capture_segment
from openCv import predict_single_action
from addJson import add_to_json

def process_live_video(camera_index, segment_duration, model, output_directory, SEQUENCE_LENGTH):
    """
    Capture a segment of live video, predict its content, and handle based on prediction.

    Args:
    camera_index (int): Index of the camera (e.g., 0 for the default camera).
    segment_duration (int): Duration of the video segment to capture in seconds.
    model: The trained LRCN model used for prediction.
    output_directory (str): Directory where the video segments will be saved.
    SEQUENCE_LENGTH (int): Number of frames used by the model for predictions.
    """
    # Create a temporary file path for the segment
    timestamp = int(time.time())
    temp_file_path = f"{output_directory}/temp_segment_{timestamp}.mp4"

    # Capture a short segment of live video
    capture_segment(camera_index, temp_file_path, segment_duration)

    # Predict on the saved segment
    result = predict_single_action(temp_file_path, SEQUENCE_LENGTH, model)

    # Check prediction and decide to save or delete
    if result["class"] == "Violence":
        # Move or rename file to save it permanently
        final_file_path = f"{output_directory}/violence_segment_{timestamp}.mp4"
        os.rename(temp_file_path, final_file_path)
        print(f"Saved violence segment to {final_file_path}")
        print(os.path.abspath('data/data.json'))
        add_to_json(final_file_path)
    else:
        # Delete the temporary file
        os.remove(temp_file_path)
        print("Deleted non-violent segment")
