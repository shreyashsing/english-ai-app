// Update the Practice component to include voice recognition
import React, { useState } from 'react';

function Practice() {
  const [response, setResponse] = useState('');
  const [transcript, setTranscript] = useState('');

  const handleSpeak = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      setResponse("Great! Let's keep practicing.");
    };

    recognition.start();
  };

  return (
    <div>
      <h1>Practice Speaking with AI</h1>
      <p>Click the button and start speaking to practice.</p>
      <button onClick={handleSpeak}>Speak</button>
      <p>Your Speech: {transcript}</p>
      <p>AI Response: {response}</p>
    </div>
  );
}

export default Practice;
