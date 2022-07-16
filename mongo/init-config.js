db.auth('ubio_secret_username', 'ubio_secret_password')

db = db.getSiblingDB('ubio')

db.createUser({
    user: 'user',
    pwd: 'password',
    roles: [
        {
            role: 'readWrite',
            db: 'ubio',
        },
    ],
});
