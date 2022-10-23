# E-Commerce Server Side

> Server side for our E-Commerce business site.

## Routes

- POST - `{{URL_8080}}supplier`

```bash
{
    "user": "6353918cd3b35f446205bb08",
    "tradeLicenseNumber": 11111110101,
    "location": "41/02/01, Pathantola, Dhamrai, Dhaka",
    "nidPhoto": "https://scontent.fdac8-1.fna.fbcdn.net/v/t1.18169-9/18485509_428251617553548_6022972889946657741_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9267fe&_nc_eui2=AeHJdP5hEiAUOBSqB4zmMTlgrIxfOO_5pX-sjF847_mlf_Q0_m5ESYRU-5xAO0gn0fr1BGJhBaAQ-hu8wkjiCGSw&_nc_ohc=IFADgjuziowAX-A7ZHN&_nc_ht=scontent.fdac8-1.fna&oh=00_AT9TWsxkvjAk2LVTDIP-Y7MXNrn6Ci97Fq6UuPKlT2NJ7w&oe=637BAD23"
}
```

- GET - `{{URL_8080}}supplier/` # Display all

- GET - `{{URL_8080}}supplier/6354a977d099a324db79bab5` # Display specific

- PATCH - `{{URL_8080}}supplier/6354a977d099a324db79bab5` # Update specific

```bash
{
    "nidPhoto": "https://i0.wp.com/lh3.googleusercontent.com/-gNN7sw0z-7Q/Wm88F7YmSMI/AAAAAAAACsE/ZtSngqJbiAwqGaSmPgvh_OX0BSv_CIclgCLcBGAs/s640/smart%2Bnid%2Bbd.jpg?resize=650,400"
}
```
