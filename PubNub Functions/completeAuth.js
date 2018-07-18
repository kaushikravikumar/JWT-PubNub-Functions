export default (request, response) => {

    const xhr = require('xhr'); // reference to xhr module used to make HTTP requests
    const crypto = require('crypto'); // crypto module provided by PubNub functions to handle cryptographic signing algorithms
    var sign = crypto.createSign('RSA-SHA256'); // reference to object that signs payload with RSA-SHA256 encryption

    var private_key = "INSERT_PRIVATE_KEY_HERE";

    var header = {
        "alg": "RS256",
        "typ": "JWT"
    };
    var payload = {
        "iss": "SERVICE_ACCOUNT_EMAIL_HERE",
        "scope": "https://www.googleapis.com/auth/drive",
        "aud": "https://www.googleapis.com/oauth2/v4/token",
        "exp": parseInt(Date.now() / 1000) + 60 * 60, // 60 minutes
        "iat": parseInt(Date.now() / 1000) // Current time
    };

    var unsignedJWT = [new Buffer(JSON.stringify(header)).toString('base64'),
        new Buffer(JSON.stringify(payload)).toString('base64')
    ].join('.');

    var signature = sign.update(unsignedJWT).sign(private_key, 'base64');

    var encoded_jwt = replaceUnencodedChars([unsignedJWT, signature].join('.'));

    var accessTokenURL = "https://www.googleapis.com/oauth2/v4/token";

    const accessTokenRequestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "www.googleapis.com"
        },
        "body": "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + encoded_jwt
    };

    return xhr.fetch(accessTokenURL, accessTokenRequestOptions).then((accessTokenResponse) => {
        var accessToken = JSON.parse(accessTokenResponse.body).access_token;
        console.log(accessToken);
        const getDriveFileURL = "https://www.googleapis.com/drive/v2/files/1dN-ZgKdiii7pyVB7zaXzuSHyOaq75ctgykl7RGzG1JU/export?mimeType=text/plain";
        const getDriveFileOptions = {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + accessToken,
            }
        };
        return xhr.fetch(getDriveFileURL, getDriveFileOptions).then((driveResponse) => {
            console.log(driveResponse);
        }).catch((err) => {
            return err;
        });
    });
};

// Helper method that replaces pluses and slashes that aren't properly converted in base64 conversion.
function replaceUnencodedChars(unencoded) {
    return unencoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
