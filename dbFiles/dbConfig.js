const config = {
    user: 'adminfrumos',
    password: '123456789',
    server: 'DESKTOP-7MAAVDK',
    database: 'CS2_SKINS_DB',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS',
        encrypt: false,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    },
    port: 1434
}

module.exports = config;