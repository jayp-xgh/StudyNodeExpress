const getContacts = (req, res) => {
  res.status(200).json({message: 'Get all contacts'});
};

const createContact = async (req, res) => {
  console.log(`the body is : ${req.body}`);
  const {name, email, phone } = req.body;
  if(!name || !email ||!phone){
    res.status(400);
    throw new Error("All fields are mendatory !");
  }
  res.status(201).json({message: 'Create Contact'});
};

const getContact = async (req, res) => {
  res.status(200).json({message: `Get constact for ${req.params.id}`});
}

const updateContact = async (req, res) => {
  res.status(200).json({message: `Upate contact for ${req.params.id}`});
}

const deleteContact = async  (req, res) => {
  res.status(200).json({message: `Delete contact for ${req.params.id}`});
}

module.exports = {  getContacts, getContact, createContact, updateContact, deleteContact};