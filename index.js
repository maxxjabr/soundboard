import { server, playSound } from "./http.js";

const port = 8080;

server.listen(port, () => {
	console.log(`HTTP server is listening on port ${port}.`);
});
