from flask import Flask, jsonify, send_file, abort
import json
import os

app = Flask(__name__)

# Define the path to the data.json file
JSON_FILE_PATH = os.path.join('data', 'data.json')

# Endpoint to get the file list
@app.route('/get-files', methods=['GET'])
def get_files():
    try:
        # Read and parse the JSON data
        with open(JSON_FILE_PATH, 'r') as json_file:
            data = json.load(json_file)

        # Return the data as a JSON response
        return jsonify(data), 200

    except FileNotFoundError:
        return jsonify({"error": "data.json file not found"}), 404

    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON data"}), 500

# Endpoint to download the video by its index or file number
from flask import Flask, send_file, jsonify, request
import json
import os

app = Flask(__name__)

# Define the path to the data.json file
JSON_FILE_PATH = os.path.join('data', 'data.json')

# Endpoint to get the file list
@app.route('/get-files', methods=['GET'])
def get_files():
    try:
        # Read and parse the JSON data
        with open(JSON_FILE_PATH, 'r') as json_file:
            data = json.load(json_file)

        # Return the data as a JSON response
        return jsonify(data), 200

    except FileNotFoundError:
        return jsonify({"error": "data.json file not found"}), 404

    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON data"}), 500

# Endpoint to stream the video by its index or file number
@app.route('/video/<int:file_id>', methods=['GET'])
def stream_video(file_id):
    try:
        # Read and parse the JSON data
        with open(JSON_FILE_PATH, 'r') as json_file:
            data = json.load(json_file)

        # Find the entry matching the file_id
        for item in data:
            if item['file'] == file_id:
                file_path = item['file_path']

                # Ensure the file exists
                if os.path.exists(file_path):
                    # Send the file as a streaming response
                    return send_file(file_path, mimetype='video/mp4', as_attachment=False)

                else:
                    return jsonify({"error": "File not found"}), 404

        # If the file_id is not found in data.json
        return jsonify({"error": "File ID not found"}), 404

    except FileNotFoundError:
        return jsonify({"error": "data.json file not found"}), 404

    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON data"}), 500


if __name__ == '__main__':
    # print()
    app.run(host='0.0.0.0', port=5000, debug=True)
