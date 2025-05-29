const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // Example response - replace with actual run logic
  res.json({ output: "Hello World\n" });
});

module.exports = router;
