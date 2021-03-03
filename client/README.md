https://mor-parkkaro.web.app/

I have made this site in MERN, deploy frontend on firebase, database is on mongo atlas and deploy backend on heroku. 

In Backend:
I used async function with try and catch block for error handling and send API responses in JSON with status code,
I saved user's password using in bcrypt form using "bcryptjs", for authentication I  used JSON web token, 
and for mailing I used nodemailer. When user signup it will send mail to that email address for verification if it is not verified then you can not authenticate for login 
and there is one hour time for verify and same strategy for reset password its token will expire in an hour. 
For payment method, I used stripe.

In Frontend:
I used functional components using hooks, for dark and light theme I used useContext hook, save user's token in cookies using "react-cookie", for fetching use axios,
for mobile responsive I used media query.

If you have time please give your feedback and if find any problem then let me know.
