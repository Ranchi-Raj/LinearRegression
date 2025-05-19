from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
# import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load('model.pkl')

@app.route('/predict',methods=['POST']) 
def predict():
    data = request.get_json()
    cgpa = data['cgpa']

    if cgpa is None:
        return jsonify({'error': 'CGPA is required'}), 400

    cgpa = float(cgpa)

    # Predict using the model
    if cgpa < 0 or cgpa > 10:
        return jsonify({'error': 'CGPA must be between 0 and 10'}), 400
    
    prediction = model.predict(np.array([[cgpa]]))
    prediction = prediction[0]
    return jsonify({'prediction': round(prediction,2)})

if( __name__ == '__main__'):
    app.run(debug=True)