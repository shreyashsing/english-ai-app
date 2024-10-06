import React, { useState, useEffect, useCallback } from 'react';

function Practice() {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true; // Keep listening
    recognitionInstance.interimResults = true; // Show interim results
    setRecognition(recognitionInstance);
  }, []);

  // Start listening for speech
  const startListening = useCallback(() => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  }, [recognition]);

  // Stop listening for speech
  const stopListening = useCallback(() => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  }, [recognition]);

  // Handle results from speech recognition
  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        let interimTranscript = ''; // Variable to hold interim results
        let finalTranscript = ''; // Variable to hold final result

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript + ' '; // Accumulate final results
          } else {
            interimTranscript += result[0].transcript + ' '; // Accumulate interim results
          }
        }
        
        setTranscript(finalTranscript + interimTranscript); // Update transcript state

        if (finalTranscript) {
          // Speak only when there is a final transcript
          const aiResponse = `You said: "${finalTranscript.trim()}". Let's keep practicing!`;
          setResponse(aiResponse);
          speakResponse(aiResponse); // Speak the AI response
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error: ", event.error);
        stopListening(); // Stop listening on error
      };
    }
  }, [recognition, stopListening]);

  // Text-to-Speech function
  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Practice Speaking English</h1>
      <button 
        className={`bg-blue-500 text-white px-4 py-2 rounded ${isListening ? 'opacity-50' : ''}`}
        onClick={isListening ? stopListening : startListening}
        disabled={isListening}
      >
        {isListening ? 'Listening...' : 'Start Listening'}
      </button>
      <div className="mt-4">
        <h2 className="text-lg">You said:</h2>
        <p className="border p-2">{transcript}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg">AI Response:</h2>
        <p className="border p-2">{response}</p>
      </div>
    </div>
  );
}

export default Practice;
