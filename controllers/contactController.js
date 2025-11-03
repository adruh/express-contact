const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('All fields are mandatory!');
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    });

    res.status(201).json(contact);
});

// @desc    Get a contact by ID
// @route   GET /api/contacts/:id
// @access  Public
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});

// @desc    Update a contact by ID
// @route   PUT /api/contacts/:id
// @access  Public
const updateContactById = asyncHandler(async (req, res) => {
     const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found');
    }
   const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);

});

// @desc    Delete a contact by ID
// @route   DELETE /api/contacts/:id
// @access  Public

const deleteContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found');
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});



module.exports = {
    getContacts,
    createContact,
    getContactById,
    updateContactById,
    deleteContactById
};