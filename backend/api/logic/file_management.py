import uuid
import base64

import mimetypes


def upload_file(file: str) -> str:
    fileName = 'assets/upload/' + str(uuid.uuid4()) + mimetypes.guess_extension(file.split(':')[1].split(';')[0])

    with open(fileName, 'wb') as f:
        f.write(base64.decodebytes(bytearray(file.split(',')[1], 'utf-8')))
    return fileName
