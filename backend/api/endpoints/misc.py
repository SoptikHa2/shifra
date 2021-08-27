import io
import subprocess
import qrcode
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter()


@router.get('/api/generateTeamJoinQR/{teamCode}')
def genQR(teamCode: str):
    """
    Generate QR code pointing to https://shifra.klubfitpp.cz/join/[ID].

    The user should see a confirmation screen asking whether they
    want to join a team for given cipher.

    :param teamCode: The join code of a team
    :return 200 OK and SVG image if successful, server error otherwise
    """

    # The only non-URI-reserved character we expect is a space, handle it.
    # Other cases do not interest us.
    teamCode = teamCode.replace(" ", "%20")

    img = qrcode.make('https://shifra.klubfitpp.cz/join/' + teamCode)

    stream = io.BytesIO()
    img.save(stream)
    stream.seek(0)

    # Save the image into fastapi response stream
    return StreamingResponse(stream, media_type="image/png")


@router.get('/api/version')
def version():
    """
    Return current git version running
    """
    return subprocess.check_output(["git", "describe", "--always"]).strip()
