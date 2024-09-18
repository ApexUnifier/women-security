import json
import os

def add_to_json(output_path):
    # Define the path to the JSON file
    json_file_path = 'data/data.json'
    
    # Check if the JSON file exists
    if not os.path.exists(json_file_path):
        print(f"File {json_file_path} does not exist.")
        return
    
    # Load the existing data from the JSON file
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    
    # Find the next file number by checking the highest 'file' key value
    if data:
        max_file_num = max(item['file'] for item in data)
    else:
        max_file_num = 0
    
    # Create the new entry
    new_entry = {
        "file": max_file_num + 1,
        "file_path": output_path
    }
    
    # Append the new entry to the data
    data.append(new_entry)
    
    # Write the updated data back to the JSON file
    with open(json_file_path, 'w') as file:
        json.dump(data, file, indent=4)
    
    print(f"New entry added: {new_entry}")

# Example usage:
# add_to_json("/path/to/output")
