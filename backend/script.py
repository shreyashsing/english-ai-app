from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)

# Load the English NLP model
nlp = spacy.load("en_core_web_sm")

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data['text']

    # Process the text with spaCy
    doc = nlp(text)

    # Extract entities and tokens
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    tokens = [token.text for token in doc]

    return jsonify({
        'entities': entities,
        'tokens': tokens
    })

if __name__ == '__main__':
    app.run(debug=True)
