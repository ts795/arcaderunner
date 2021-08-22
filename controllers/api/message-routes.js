const router = require("express").Router();
const { Op } = require('sequelize')
const path = require("path");
const { Message } = require('../../models');

// Add a message between two users
// The following are expected in the request body:
// text is the text for the message
// senderID is the ID for the user that is sending the message
// receiverID is the ID for the user that is receiving the message
router.post('/', async (req, res) => {
  try {
    const messageData = await Message.create({
      text: req.body.text,
      user_id: req.body.senderID,
      receiver_id: req.body.receiverID
    })
    res.status(200).json(messageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get messages between two users
router.get('/:user1Id/:user2Id', async (req, res) => {
  try {
    const messageData = await Message.findAll({
      where: {
        [Op.or]: [
          { user_id: parseInt(req.params.user1Id), receiver_id: parseInt(req.params.user2Id) },
          { user_id: parseInt(req.params.user2Id), receiver_id: parseInt(req.params.user1Id) }
        ]
      },
      order: [['created_at', 'DESC']]
    })
    const messages = messageData.map((message) =>
      message.get({ plain: true })
    );
    res.status(200).json(messageData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
