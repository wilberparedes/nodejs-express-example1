const express = require('express');
const UserService = require('../service/users.service');
const router = express.Router();
const service = new UserService();

/* users - obtener query params
 * http://localhost:3000/users?limit=10&offset=200
 * data fake: npm i faker@5.5.3 -S
 */
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  const users = service.find();
  if (limit && offset) {
    res.json({
      limit,
      offset,
      data: users,
    });
  } else {
    res.json(users);
  }
});

router.get('/:userID', (req, res) => {
  const { userID } = req.params;
  const getUser = service.findOne(userID);
  if (getUser) {
    res.json(getUser);
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

module.exports = router;
