### Register API -> `POST /api/auth/register`

#### USER Register

```json
{
  "data": {
    "email": "user1@example.com",
    "phone": "1234567890",
    "password": "user1password",
    "gender": "Male",
    "aadhar": "123456789012",
    "emergencyContact": {
      "name": "John Doe",
      "phone": "0987654321",
      "email": "johndoe@example.com"
    }
  },
  "accountType": "USER"
}
```

#### POLICE Register

```json
{
  "data": {
    "regId": "POL123",
    "mail": "police1@example.com",
    "password": "police1password",
    "gender": "Male"
  },
  "accountType": "POLICE"
}
```

#### ADMIN Register

```json
{
  "data": {
    "email": "admin1@example.com",
    "password": "admin1password"
  },
  "accountType": "ADMIN"
}
```

### Login API -> `POST /api/auth/login`

#### USER Login

```json
{
  "data": {
    "email": "user1@example.com",
    "password": "user1password"
  },
  "accountType": "USER"
}
```

#### POLICE Login

```json
{
  "data": {
    "email": "police1@example.com",
    "password": "police1password"
  },
  "accountType": "POLICE"
}
```

#### ADMIN Login

```json
{
  "data": {
    "email": "admin1@example.com",
    "password": "admin1password"
  },
  "accountType": "ADMIN"
}
```
