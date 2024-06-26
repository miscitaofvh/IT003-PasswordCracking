from flask import Flask, request, jsonify
from flask_cors import CORS
from zipfile import ZipFile, BadZipFile
import itertools
import zlib
import requests
import os

"""Define the character set and the limit for password length"""
listChar = ".QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm"
limitLength = 1

"""Initialize Flask app and enable CORS"""
app = Flask(__name__)
CORS(app)

@app.route('/crack', methods=["POST"])
def crack():
    """
    Handle the '/crack' route to attempt to crack the password of a given zip file.
    
    Returns:
        JSON response containing either the cracked password or a failure message.
    """

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
        response = requests.get("https://raw.githubusercontent.com/miscitaofvh/IT003-PassworkCracking/main/dictionary.txt")
        passwords = response.text.splitlines()
        for pwd in passwords:
            try:
                zip_ref.extractall(pwd = pwd.encode())
                return jsonify({"password":pwd})
            except (RuntimeError, BadZipFile, zlib.error):
                continue
        for length in range(1, limitLength + 1):
            for pwd_tuple in itertools.product(listChar, repeat=length):
                pwd = ''.join(pwd_tuple)
                try:
                    zip_ref.extractall(pwd=pwd.encode())
                    return jsonify({"password":pwd})
                except (RuntimeError, BadZipFile, zlib.error):
                    continue
    return jsonify({"message":"Password not found"}) 

@app.route('/removePassword', methods=["POST"])
def removePassword():
    """
    Handle the '/removePassword' route to remove the password from a given zip file.
    
    This route takes a zip file and its password, then creates a new zip file without
    a password and saves it as 'output.zip'.
   
    Returns:
        JSON response indicating success or failure.
    """
    zipFile = request.files.get('file')
    pwd = request.form["password"]
    if os.path.exists("output.zip"):
        os.remove("output.zip")
        
    with ZipFile(zipFile, 'r') as zf:
        with ZipFile("output.zip", 'w') as new_zip:
            for file_info in zf.infolist():
                with zf.open(file_info.filename, pwd=pwd.encode('utf-8')) as file:
                    new_zip.writestr(file_info, file.read())

    return jsonify({"message":"done"})
if __name__ == "__main__":
    app.run(debug=True)

