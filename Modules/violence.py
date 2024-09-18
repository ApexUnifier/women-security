from createModel import LRCNModel
import cv2
import numpy as np
import os
from collections import deque
from liveCv import predict_on_liveVideo
from openCv import predict_on_video, predict_single_action
#path to model
test_list = ['CrimeVid/violence_segment_1726636031.mp4']

save_dir = 'CrimeVid'

path_list = ['0.81.h5']#,'0.81.h5','0.86.h5','ViolenceModelFinal.keras']

result =[]

# path_to_model = "Time Series.h5"
# Define the model
# path_to_video="wwe.mp4"

lrcModel = LRCNModel(20, 64, 64, 2)

model = lrcModel.create_model()  # Call the function to instantiate the model

for path_to_model in path_list:

    for path_to_video in test_list:

        # Load the saved weights into the model

        model.load_weights(f'Models/{path_to_model}',20)
        # Optionally, print model summary

        # model.summary()

        # Initialize the VideoCapture object to read from the video file.
        # predict_on_liveVideo(0, save_dir, 20,model)
        predict_on_video(path_to_video,f'{path_to_video}-{path_to_model}.mp4',20,model)
        prediction = predict_single_action(path_to_video,20,model)

#         result.append(prediction)
# print(result)
