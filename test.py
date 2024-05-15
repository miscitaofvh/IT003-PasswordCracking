from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from zipfile import ZipFile, BadZipFile
import itertools
import zlib

# Define the character set and the limit for password length
listChar = "QWERTYUIOP}{ASDFGHJKL:ZXCVBNM1234567890-=qwertyuiopasdfghjklzxcvbnm,./!@#$%^&*()_+<>?"
limitLength = 6

   
with ZipFile("pwd.zip", 'r') as zip_ref:
    for length in range(1, limitLength + 1):
        for pwd_tuple in itertools.product(listChar, repeat=length):
            pwd = ''.join(pwd_tuple)
            try:
                zip_ref.extractall(pwd=bytes(pwd, 'utf-8'))
                print(pwd)
            except (RuntimeError, BadZipFile, zlib.error):
                continue


