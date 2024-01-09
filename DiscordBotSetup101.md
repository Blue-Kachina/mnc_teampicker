# Discord Bot Setup 101
This is just a collection of things that I discovered along the way

# Bot Registry And Configuration
Although registering a bot prior to coding it seemed counterintuitive to me, that's the way it goes here.
It's during bot registration that you receive your API keys.

1) Create a new `application` for your bot
https://discord.com/developers/applications

There are some details about how to do this within the `README.md` file here.


2) OAuth setup is very important.  There's a URL Generator where you need to pick `applications.commands` and `bot` at very least.  The bottom of this page will have a URL for you.  This URL can be used from a browser in order to invite your bot into your Discord server.


3) Ensure your application is configured with the proper `.env` details (if you don't already have a `.env` file, then run `cp .env.sample .env` and then update it with the proper API Key values)


4) Register any newly created/updated commands using `npm run register`


5) Run your application using `node app.js` or better yet `nodemon` if you have it installed (nodemon will hot-reload your app).  This should start listening on port 3000


6) Run `ngrok.exe http 3000` and watch the resultant command line output for a Forwarding address (should be a hard to remember https address).  Copy it to your clipboard


7) Paste the forwarding address into the bot's settings page (from step 1). At the time of writing, it goes into `General Information` > `INTERACTIONS ENDPOINT URL`

^^ append `/interactions` to the end of it. 


Your bot should be functional at this point.

