import { readFile } from "fs";
import { createServer } from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const directory = dirname(fileURLToPath(import.meta.url));
const clients = [];

export const server = createServer((req, res) => {
	switch (req.url) {
		case "/events":
			res.writeHead(200, {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				"Connection": "keep-alive"
			});
			clients.push(res);

			req.on("close", () => {
				clients.splice(clients.indexOf(res), 1);
			});
			break;
		case "/":
			req.url = "/index.html";
		default:
			readFile(join(directory, req.url), (error, data) => {
				if (error) {
					res.writeHead(404);
					return res.end("File not found");
				}
				res.writeHead(200);
				res.end(data);
			});
	}
});

/**
 * Sends a sound to the client.
 * @param {String} path - The file path of the sound.
 */
export function playSound(path) {
	const data = `event: sound\ndata: ${path}\n\n`;
	for (const client of clients) {
		client.write(data);
	}
}
