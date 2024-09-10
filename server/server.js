import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 8000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));


app.listen(port, () => console.log(`app is listening on port ${port}`));