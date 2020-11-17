const express = require('express');
const PORT = 3001;
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { v4: uuid } = require('uuid');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const users = [
  { id: 0, name: 'John', isOnline: false, isBot: true, token: uuid() },
  { id: 1, name: 'Andrii', isOnline: true, isBot: true, token: uuid() },
  { id: 2, name: 'Elena', isOnline: true, isBot: true, token: uuid() },
  { id: 3, name: 'Sergii', isOnline: false, isBot: true, token: uuid() },
  { id: 4, name: 'Alina', isOnline: true, isBot: true, token: uuid() },
];

const messages = [
  { from: 0, to: 1, text: 'Hello!' },
  { from: 1, to: 0, text: 'Heya!' },
];

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

/** Auth middleware */
const checkAuth = (req, res, next) => {
  const token = req.headers.auth;
  const user = users.find(d => (d.token === token));
  if (!!user) {
    req.user = user;
    next();
  }
  res.status(401);
  res.send({ error: 'Unauthorized' });
};

/** Login */
app.post('/login', (req, res) => {
  const newToken = uuid();
  const name = req.body.name;
  if (name) {
    users.push({
      id: users.length,
      name,
      isOnline: true,
      isBot: false,
      token: newToken,
    });
    res.send({
      token: newToken,
    });
  } else {
    res.status(422);
    res.send({
      error: "No 'name' provided",
    });
  }
});

/** Get user list */
app.get('/users', checkAuth, (req, res) => {
  res.send({
    users: users.map(({ id, name, isOnline }) => ({
      id,
      name,
      isOnline,
    })),
  });
});

/** Get message history */
app.get('/messages', checkAuth, (req, res) => {
  const userId = parseInt(req.query.user_id);
  const authUserId = parseInt(req.user.id);
  const filteredMessages =
    messages
      .filter(d => (d.from === userId && d.to === authUserId) || (d.from === authUserId && d.to === userId))
      .map(d => ({ ...d, isSelf: d.from === authUserId }));
  res.send({
    messages: filteredMessages,
  });
});

/** Send message history */
app.post('/send', checkAuth, (req, res) => {
  const text = req.body.text;
  const targetId = req.body.to;
  const targetUser = users.find(d => (d.id === targetId));
  if (!text || !targetId || !targetUser) {
    res.status(422);
    res.send({
      error: "Invalid data provided",
    });
  } else {
    messages.push({
      from: req.user.id,
      to: targetId,
      text: text,
    });
    if (targetUser.isBot) {
      messages.push({
        to: req.user.id,
        from: targetId,
        text: lorem.substring( Math.floor(Math.random() * lorem.length), Math.floor(Math.random() * 10)),
      });
    }
    res.send({
      status: "Ok",
    });
  }
});


app.listen(PORT, () => console.log('Server is listening on port', PORT));
