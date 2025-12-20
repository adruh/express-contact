const express = require('express');
const router = express.Router();
const { getContacts,createContact,getContactById,updateContactById,deleteContactById } = require('../controllers/contactController');
const validationToken = require('../middleware/validateTokenhandler');

// Define your contact routes here
// For example:
router.use(validationToken)
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById);



module.exports = router;