const app = require('../src/app.js');
const { port } = require('../config/env.js');

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
