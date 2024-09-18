import cv2
import numpy as np
import os
from collections import deque
IMAGE_HEIGHT, IMAGE_WIDTH = 64,64
CLASSES_LIST = ["NonViolence","Violence"]

def predict_on_liveVideo(camera_index, output_directory, SEQUENCE_LENGTH, model):
    # Initialize the VideoCapture object to read from the camera.
    video_reader = cv2.VideoCapture(camera_index)

    # Get the width and height of the video.
    original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
    original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # Initialize frame buffers and flags
    frames_queue = deque(maxlen=SEQUENCE_LENGTH)
    pre_violence_buffer = deque(maxlen=60)
    post_violence_buffer = deque(maxlen=60)
    detecting_violence = False
    save_frames = False

    # Initialize a variable to store the predicted action being performed in the video.
    predicted_class_name = ''

    while True:
        # Read the frame from the camera.
        ok, frame = video_reader.read()
        if not ok:
            print("Failed to capture frame from camera.")
            break

        resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
        normalized_frame = resized_frame / 255
        frames_queue.append(normalized_frame)

        if len(frames_queue) == SEQUENCE_LENGTH:
            predicted_labels_probabilities = model.predict(np.expand_dims(frames_queue, axis=0))[0]
            predicted_label = np.argmax(predicted_labels_probabilities)
            predicted_class_name = CLASSES_LIST[predicted_label]

            if predicted_class_name == 'Violence':
                detecting_violence = True
                save_frames = True

        if detecting_violence:
            if len(pre_violence_buffer) < 20:
                pre_violence_buffer.append(frame)
            elif save_frames:
                post_violence_buffer.append(frame)
                if len(post_violence_buffer) == 20:
                    # Create a unique output file name based on timestamp
                    output_file_path = f"{output_directory}/violence_segment_{int(cv2.getTickCount())}.mp4"
                    video_writer = cv2.VideoWriter(output_file_path, cv2.VideoWriter_fourcc('M', 'P', '4', 'V'),
                                                   video_reader.get(cv2.CAP_PROP_FPS), 
                                                   (original_video_width, original_video_height))
                    
                    for buffered_frame in pre_violence_buffer:
                        video_writer.write(buffered_frame)
                    for buffered_frame in post_violence_buffer:
                        video_writer.write(buffered_frame)
                    
                    video_writer.release()
                    pre_violence_buffer.clear()
                    post_violence_buffer.clear()
                    save_frames = False
                    detecting_violence = False
                    

        # Display the frame with the prediction
        cv2.putText(frame, predicted_class_name, (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('Live Video Feed', frame)

        # Break loop on 'q' key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # Release resources
    video_reader.release()
    cv2.destroyAllWindows()
