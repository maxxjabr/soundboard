import { server, playSound } from "./http.js";
import { Client as TwitchClient } from "tmi.js";

const port = 8080;

server.listen(port, () => {
	console.log(`HTTP server is listening on port ${port}.`);
	
	// Connect to Twitch chat.
	new TwitchClient({ channels: [ "nitemera" ] })
		.on("message", (channel, tags, message, self) => {
			message.trim().split(/\s+/)
				.filter(x => x.startsWith("!")) // Filter out non-commands.
				.forEach(x => playSound(x.slice(1))); // Play the sound.
		})
		.connect().then(([ uri, port ]) => {
			console.log(`Successfully connected to ${uri}:${port}.`);
		});
});
