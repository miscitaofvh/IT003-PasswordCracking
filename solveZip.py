from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from zipfile import ZipFile, BadZipFile
import itertools
import zlib

# Define the character set and the limit for password length
listChar = ".QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm"
limitLength = 6

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)
#CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
@app.route('/crack', methods=["POST"])

def crack():
    zipFile = request.files.get('file')
    
    if not zipFile:
        return jsonify({"message":"Please select a file"})
    if not zipFile.filename.endswith('.zip'):
        return jsonify({"message":"Please upload zip file"})
    try:
        with ZipFile(zipFile) as zip_ref:
            if zip_ref.testzip() is None:
                return jsonify({"message":"Zip file has no password"})  
    except (RuntimeError, BadZipFile):
        None
    with ZipFile(zipFile) as zip_ref:
        with open('password.txt', 'r') as f:
            passwords = f.read().splitlines()
            for pwd in passwords:
                try:
                    zip_ref.extractall(pwd=bytes(pwd, 'utf-8'))
                    return jsonify({"message":pwd})
                except (RuntimeError, BadZipFile, zlib.error):
                    continue
        for length in range(1, limitLength + 1):
            for pwd_tuple in itertools.product(listChar, repeat=length):
                pwd = ''.join(pwd_tuple)
                try:
                    zip_ref.extractall(pwd=bytes(pwd, 'utf-8'))
                    return jsonify({"message":pwd})
                except (RuntimeError, BadZipFile, zlib.error):
                    continue
    return jsonify({"message":"Zip file has no password"}) 

if __name__ == "__main__":
    app.run(debug=True)

