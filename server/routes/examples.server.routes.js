const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(examples.hello);
  
module.exports = router;



//private route would be good for login
