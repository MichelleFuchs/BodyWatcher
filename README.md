This is a MERN-App for tracking your body weight, optimized for mobile screens. It was built for fun and learning purposes. At the moment there is no account, so feel free do run it locally if you want to use it. Instructions below.

## Live DEMO

For a working live demo see this heroku app (cause the server sleeps it loads a while...stay tuned ;)):

[https://glacial-stream-70320.herokuapp.com/](https://glacial-stream-70320.herokuapp.com/)

Feel free to add or remove entries. You can also generate example data in the settings so you can check the features better.

## Installation

### Requirements

Make sure you have install Node.js and NPM.

`node -v`

`npm -v`

If you don't see the versions, make sure to install it. Check Google (or preferably [DuckDuckGo](https://duckduckgo.com/?q=install+node+and+npm)) for instructions.

### Database

If not already done you need to register your account on the [mongoDB cloud](https://cloud.mongodb.com/). Choose the free option unless you want to pay. Create a Cluster. When running the app it will automatically create a databased calles "BodyWatcher" with a collection "bodyData".

Make sure you have a user created (Left Sidebar > Security > Database Access). You will need the password later on.

Now you need to get the connection link for your cluster. Click on "Clusters" in the left sidebar. Then you should find and click the "CONNECT" button inside the content. Click the middle button "Connect your application", choose Node.js and copy the link below. Make sure to replace the password.
It will look like this: `mongodb+srv://myUser:<password>@mycluster-dtwng.mongodb.net/test?retryWrites=true&w=majority`

Also I recommend to open your database to any IP since your local IP will eventually change:
Click on "Security" > "Network Access" in the left sidebar. Add a new IP Adress like this `0.0.0.0/0`.

### Configuration

Download or clone the repository and switch to it's folder in the command line.

`git clone https://github.com/MichelleFuchs/BodyWatcher.git`

You now need to add a environment variable with the link to your mongoDB. You now need the link gathered above in the database section. To add the variable you can simply type

`export mongoURI="mongodb+srv://myUser:mySecretPassword@myCluster-dtwng.mongodb.net/test?retryWrites=true&w=majority"`

but make sure to replace it with your custom link.

Plase note that the variable is only temporarily. An option is to add it to the `package.json` server-script like below:

```
"scripts": {
    ...
    "server": "export mongoURI=mongodb+srv://myUser:mySecretPassword@myCluster-dtwng.mongodb.net/test?retryWrites=true&w=majority; nodemon index.js",
    ...
  },
```

### Install and run

Install the dependencies for the backend:

`npm install`

...and the frontend:

`npm run client_install`

Now you can start the application by running
`npm run dev`
This will start both servers and a browser window with the frontend access should automatically open.

### Troubleshooting

Make sure that your environment variable is set correctly:

`echo $mongoURI`

Also check if the link to your mongodb is correct, you replaced the password and you allowed access from all IP adresses.

If you want you can also run mongoDB locally but I won't explain this here.
