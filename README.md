# E-Commerce Server Side

> Server side for our E-Commerce business site.

## User route

- There are five vendors

  - Admin
  - Buyer
  - Seller
  - Deliverer
  - Supplier

- **Sign Up an user** - `{{URL_8080}}user/avatar`

```bash
{
    "fullName": "Hasibul Islam",
    "email": "hasib143sl@gmail.com",
    "password": "Hasib@123",
    "confirmPassword": "Hasib@123",
    "contactNumber": "+8801356215901",
    "role": "admin"
}
```

---

- **Sign In an user** - `{{URL_8080}}user/signin`

```bash
{
    "email": "hasib143sl@gmail.com",
    "password": "Hasib@123"
}
```

---

- **Retain an user** - `{{URL_8080}}user/me`

```bash
Approach the Bearer Token that generated after `Sign in` which going to be displayed.
```

---

- **Display all users** - `{{URL_8080}}user/all`

```bash
    * Approach the Bearer Token that generated after `Sign in` which going to be displayed.
    * Only visible to `Admin` only
```

---

- **Upload user avatar** - `{{URL_8080}}user/avatar`

```bash
Upload an avatar that is less than or equal 1MB.
```

---
