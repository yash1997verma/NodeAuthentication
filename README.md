Node Authentication Project
This is a Node.js authentication project that provides Sign In and Sign Up functionalities using Passport Local Strategy for local authentication and Google OAuth using Passport for third-party authentication.

Features
•	Sign In with local email and password
•	Sign Up with local email and password
•	Sign In with Google account

Getting Started
Follow these steps to set up the project on your system:
Clone the repository:
git clone <repository_url>
cd node-authentication-project

Install dependencies:
npm install

Create a .env file in the root directory and add the necessary environment variables:
MONGO_URL=mongodb://localhost:27017/node-authentication
SESSION_SECRET=YourSessionSecretHere
GOOGLE_CLIENT_ID=YourGoogleClientIDHere
GOOGLE_CLIENT_SECRET=YourGoogleClientSecretHere
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
Replace the placeholders with your actual values for MongoDB connection URL, session secret, Google Client ID, Google Client Secret, and Google Callback URL.

Run the application:
npm start

The application will start on http://localhost:8000.

Usage
•	Visit http://localhost:3000 in your web browser.
•	Click on "Sign Up" to create a new account using your email and password.
•	Click on "Sign In" to log in with your email and password.
•	Click on "Sign In with Google" to log in with your Google account.

Dependencies
This project uses the following main dependencies:
•	Express: Fast, unopinionated, minimalist web framework for Node.js.
•	Passport: Authentication middleware for Node.js.
•	Passport-local: Passport strategy for authenticating with a username and password.
•	Passport-google-oauth: Passport strategy for authenticating with Google using OAuth 2.0.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contributing
If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

Happy coding! 🚀
