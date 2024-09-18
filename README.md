# GuitarMaestro Game

This project is a simple web-based application designed to help users learn and practice recognizing guitar notes. It uses the Web Audio API to play a sequence of notes, record user input, and compare it to the expected notes.

## Features
- **Play Sequence**: Plays a sequence of notes using Web Audio API.
- **Record Audio**: Records user input and detects notes played using the microphone.
- **Check Notes**: Compares detected notes to the expected sequence and provides feedback.

## Technologies

### Frontend
- **ReactJS**: To render a frontend comprising of a dynamic fretboard
- **Web Audio API**: To take input from user
- **EssentiaJS**: To analyze the input pitch and accuracy
- **CSS**: For styling

### Backend
- **Node**: Server deployment
- **MongoDB**: To catalogue songs

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Run it locally**:
   ```bash
   Start a local server with Python
   python3 -m http.server
   
3. Open your browser and navigate to http://localhost:8000 to use the application.

## Usage

- **Play Sequence**: Click the "Play Sequence" button to play the notes.
- **Start Recording**: Click the "Record" button to start capturing audio.
- **Check Notes**: Click the "Check Notes" button to process and compare the recorded notes.

### Notes
Ensure that your browser has microphone access enabled.
The application requires a user gesture to start the AudioContext, such as clicking a button.
