## How to Run Locally
### First: Running the Backend
1. Git clone the repo to a local folder (I would not recommend cloning into any sort of OneDrive file, this may have unintended consequences with being able to run it locally).
2. In Visual Studio (or any other C#.NET IDE such as Jetbrains Rider, etc.) open up The EverGlow.API.sln file.
3. Find the appsettings.Development.json file.
4. In this DbConfiguration section shown below where it states CONNECTION_STRING_GOES_HERE, please paste in the connection string that has been provided to you (if you do not have the connection string, please email erinwalt@umich.edu and she will give you the string if it is determined that you need access)
   
    "DbConfiguration": {
    "ConnectionString": "CONNECTION_STRING_GOES_HERE"
}
5.  Press the "Run" button on the everglow API. it should bring up a swagger page with all necessary endpoints. To test the database connection, try one of the GET endpoints to see if it fetches data. If it returns data, your database connection is all set. If it returns a 500 error or some other error, then you will have to troubleshoot your connection string (or reach out to erinwalt@umich.edu to help you troubleshoot).

### Second: Running the Frontend
1. Open up the front end EverGlow.API -> ClientApp folder in your IDE (I use Visual Studio Code but you can open it in whichever IDE you use for javascript/typescript).
2. make sure that you are in the ClientApp folder (or use your terminal to cd until you are)
3. Run npm install command to install all relevant packages, may take a few minutes.
4. Once installed, you can run npm start. Your project should build, start, and show up on localhost:6955 in your browser window.
5. If it does not prompt you, you may need to click the "LogIn" button in the upper right hand corner to go to auth0 to login. It will prompt you to enter a username and password or sign in with Google/gmail (please use this Google option for now as there is no database connected to store any login information currently). You may have to click "yes" to authorize the application, and then it should refresh you back to the home page.
6. From here, you can click on the different sections in the navbar.

### Connection to a local instance of the AWS Database
1. All database tables and data are stored in a PostgreSQL AWS database, however if you would like to connect locally to see the data or add other data you can follow these steps to open it up locally.
2. Download whatever type of PostgreSQL GUI you wish, I use PGAdmin4, however there are many out there.
3. Use the HOST from the connection string as the host.
4. User "User ID" from the connection string as the Username/UserID, which should be postgres.
5. Use "Password" from the connection string as the password
6. Use "Port" as the port number, which should be 5432.
7. Use "Database" for the database name, which should be everglowdb566.

### Troubleshooting issues:
1. Database connection string errors (500 errors from swagger) - Make sure that you have correctly entered in the connection string.
2. Err Host Refused errors from the front end - please make sure that your  backend project is up and running, or else it will not be able to proxy to it and make calls.
3. Error on npm start - make sure that you are in the ClientApp folder in your terminal, if not cd to get to this folder. Also, make sure that you have run an npm install command to install necessary packages.
