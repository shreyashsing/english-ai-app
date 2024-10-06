import React, { useState } from 'react';

const Practice = () => {
  const [userInput, setUserInput] = useState('');  // State to hold user input
  const [nlpResult, setNlpResult] = useState('');  // State to hold NLP result
  const [loading, setLoading] = useState(false);   // State for loading status

  // Function to handle input change
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  // Function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);  // Log the response for debugging

      // Set the result from the backend
      setNlpResult(data);  // Update to use the entire result object
    } catch (error) {
      console.error('Error during fetch:', error);
      setNlpResult('Error analyzing text. Please try again.'); // Optional error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">NLP Practice</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="Enter text to analyze"
          value={userInput}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </form>

      {/* Show the result */}
      {nlpResult && (
        <div className="mt-4">
          <h3 className="text-xl">NLP Result:</h3>
          <h4>Tokens:</h4>
          <p>{nlpResult.tokens.join(', ')}</p>
          <h4>Entities:</h4>
          <ul>
            {nlpResult.entities.length > 0 ? (
              nlpResult.entities.map((entity, index) => (
                <li key={index}>{entity[0]}: {entity[1]}</li>
              ))
            ) : (
              <li>No entities found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Practice;
