import express from 'express';
import path from 'path';

export default app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

// TODO put in a app.get for the searching
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
