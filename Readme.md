---

# Backend Setup Guide

This guide will help you set up and run your Flask backend application using a virtual environment.

## Getting Started

### 1. Create a Virtual Environment

Create a virtual environment in the current directory:

```bash
python -m venv .env
```

### 2. Activate the Virtual Environment

Activate the virtual environment to use its isolated Python environment:

- **On Windows**:
  ```bash
  .\ .env\Scripts\activate
  ```

- **On macOS/Linux**:
  ```bash
  source .env/bin/activate
  ```

### 3. Install Required Packages

Install the necessary Python packages from the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

Ensure that `requirements.txt` is in the same directory and lists all the dependencies for your Flask app.

### 4. Run the Flask App

Start your Flask application:

```bash
python app.py
```

Make sure `app.py` is correctly configured to listen on the desired IP address and port.
---
