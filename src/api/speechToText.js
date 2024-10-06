import axios from 'axios';

export const sendAudioToGoogle = async (audioBlob) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const url = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

  const response = await axios.post(url, {
    config: {
      encoding: 'LINEAR16',
      languageCode: 'en-US',
    },
    audio: {
      content: audioBlob,  // This is the audio file you send to Google STT
    },
  });

  return response.data;
};
