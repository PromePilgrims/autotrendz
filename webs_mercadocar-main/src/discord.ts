import { createReadStream } from 'fs-jetpack'
import { MessageType, WebhookClient } from 'discord.js'

export async function sendToDiscord(path: string, content: string) {
  const client = new WebhookClient({
    id: '1246316828054130790',
    token: 'sj4JyfagLbbmcvHMtJOz7htDql3uOAwBCk0bClEu2E90_QlrTBqajiw0KoppqwuY0ktv',
  })

  try {
    await client.send({
      files: [
        {
          attachment: createReadStream(path),
          name: 'output.xlsx',
        }
      ],
      content,
    })
  } catch (error: any) {
    console.error('Error sending to Discord:', error.message)
  }
}