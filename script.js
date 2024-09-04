// Initialize Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioContext.createAnalyser();
let microphone = null;

// Sequence of notes to play (C, E, G for example)
const noteSequence = ['C', 'E', 'G'];

// Function to resume AudioContext
function resumeAudioContext() {
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('AudioContext resumed');
        }).catch(err => {
            console.error('Error resuming AudioContext:', err);
        });
    }
}

// Function to play a sequence of notes
function playSequence() {
    resumeAudioContext(); // Ensure AudioContext is resumed before playing notes

    document.getElementById('feedback').innerText = `Playing sequence: ${noteSequence.join(' - ')}`;

    // Define notes and their frequencies
    const notes = {
        'C': 261.63, // C4
        'E': 329.63, // E4
        'G': 392.00  // G4
    };

    // Function to play a single note
    function playNote(note, duration) {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(notes[note], audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    }

    // Play the sequence with a delay between notes
    let delay = 0;
    noteSequence.forEach(note => {
        setTimeout(() => playNote(note, 1), delay);
        delay += 1000; // 1 second between notes
    });
}

// Function to start recording audio
function startRecording() {
    resumeAudioContext(); // Ensure AudioContext is resumed before accessing the microphone

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            console.log('Microphone access granted');
            microphone = audioContext.createMediaStreamSource(stream);
            analyser = audioContext.createAnalyser();
            microphone.connect(analyser);
            analyser.fftSize = 2048;
            console.log('Recording started');
        })
        .catch(err => {
            console.error('Error accessing microphone:', err);
            document.getElementById('feedback').innerText = 'Error accessing microphone: ' + err;
        });
}

// Function to stop recording and process audio
function processAudio() {
    if (!analyser) return;

    const buffer = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(buffer);

    console.log('Frequency data:', buffer);

    const maxIndex = buffer.indexOf(Math.max(...buffer));
    const frequency = maxIndex * audioContext.sampleRate / analyser.fftSize;

    console.log('Frequency detected:', frequency);

    const note = detectNoteFromFrequency(frequency);
    document.getElementById('note-output').innerText = `Detected note: ${note}`;
}

// Function to detect note from frequency (simplified with tolerance)
function detectNoteFromFrequency(frequency) {
    const tolerance = 10; // Hz tolerance for note detection

    if (Math.abs(frequency - 261.63) < tolerance) return 'C';
    if (Math.abs(frequency - 329.63) < tolerance) return 'E';
    if (Math.abs(frequency - 392.00) < tolerance) return 'G';
    return 'Unknown';
}

// Function to check recorded notes against sequence
function checkNotes() {
    const detectedNote = document.getElementById('note-output').innerText.split(': ')[1];
    console.log('Detected note:', detectedNote);
    
    if (noteSequence.includes(detectedNote)) {
        document.getElementById('feedback').innerText = 'Correct note!';
    } else {
        document.getElementById('feedback').innerText = 'Incorrect note, try again!';
    }
}

// Attach event listeners
document.getElementById('play-sequence').addEventListener('click', playSequence);
document.getElementById('record').addEventListener('click', startRecording);
document.getElementById('check-notes').addEventListener('click', processAudio);
document.getElementById('check-notes').addEventListener('click', checkNotes);
