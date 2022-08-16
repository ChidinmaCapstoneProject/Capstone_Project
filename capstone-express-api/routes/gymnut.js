// const express = require('express');
// const router = express.Router();
// const gymnutController = require('../controllers/gymnutControllers');
// const ROLES_LIST = require('../config/roles_list');
// const verifyRoles = require('../middleware/verifyRoles');

// router.route('/')
//     .get(gymnutController.getAllGymnuts)
//     .post(verifyRoles(ROLES_LIST.Admin), gymnutController.createNewGymnut)
//     .put(verifyRoles(ROLES_LIST.Admin), gymnutController.updateGymnut)
//     .delete(verifyRoles(ROLES_LIST.Admin), gymnutController.deleteGymnut);

// router.route('/:id')
//     .get(gymnutController.getGymnut);

// module.exports = router;
