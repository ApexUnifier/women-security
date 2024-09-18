import cv2
import time

def capture_segment(camera_index, output_file_path, duration_seconds):
    """
    Capture a short segment of live video from the specified camera and save it to a file.

    Args:
    camera_index (int): Index of the camera (e.g., 0 for the default camera).
    output_file_path (str): Path where the segment video will be saved.
    duration_seconds (int): Duration of the video segment to capture in seconds.
    """
    # Initialize the VideoCapture object to read from the camera.
    video_reader = cv2.VideoCapture(camera_index)

    # Get the width and height of the video.
    original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
    original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = video_reader.get(cv2.CAP_PROP_FPS)

    # Initialize the VideoWriter object to store the segment video.
    video_writer = cv2.VideoWriter(output_file_path, cv2.VideoWriter_fourcc('M', 'P', '4', 'V'),
                                   fps, (original_video_width, original_video_height))

    start_time = time.time()

    while True:
        ok, frame = video_reader.read()
        if not ok:
            break

        video_writer.write(frame)

        # Break after the specified duration.
        if time.time() - start_time > duration_seconds:
            break

    video_reader.release()
    video_writer.release()
