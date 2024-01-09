import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';
import { getShuffledOptions, getResult } from './game.js';



// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data, member, channel_id } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `Hello ${member?.user?.username} `,
        },
      });
    }

    // "challenge" command
    if (name === 'challenge') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'This is a message with components.',
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  label: "Click me!",
                  style: 1,
                  custom_id: "click_one",
                },
              ]
            }
          ]
        },
      });
    }

    // "challenge" command
    if (name === 'startdraft') {
      // Send a message into the channel where command was triggered from

      const Discord = require('discord.js');
      const client = new Discord.Client(undefined);



      const thread = await channel.threads.create({
        name: 'food-talk',
        autoArchiveDuration: 3600,
        reason: 'Needed a separate thread for food',
      });

      console.log(`Created thread: ${thread.name}`);

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'Sorry bud, you lose.',
          
        },
      });
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
