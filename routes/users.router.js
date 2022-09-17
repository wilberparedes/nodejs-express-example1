const express = require('express');

const router = express.Router();

const USERS = [
  {
    id: 1,
    name: 'client 1',
    country: 'Colombia',
    city: 'Soledad',
    age: '35 years old',
  },
  {
    id: 2,
    name: 'client 2',
    country: 'Colombia',
    city: 'Barranquilla',
    age: '30 years old',
  },
  {
    id: 3,
    name: 'client 3',
    country: 'Colombia',
    city: 'Malambo',
    age: '28 years old',
  },
];

/* users - obtener query params
 * http://localhost:3000/users?limit=10&offset=200
 * data fake: npm i faker@5.5.3 -S
 */
router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
      data: USERS,
    });
  } else {
    res.json(USERS);
  }
});

router.get('/:userID', (req, res) => {
  const { userID } = req.params;
  const getUser = USERS.find((client) => client.id === Number(userID));
  if (getUser) {
    res.json(getUser);
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

module.exports = router;
