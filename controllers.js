const Contact = require('./model')
module.exports.Create = async (call, callback) => {
    console.log('-> Create');
    const { name, phoneNumber } = call.request
    try {
        const contact = new Contact({ name, phoneNumber })
        await contact.save()
        callback(null, { name: contact.name, phoneNumber: contact.phoneNumber })
    } catch (err) {
        if (err.code === 11000) {
            callback(new Error(`The contact named ${name} already exists.`))
        } else {
            callback(err)
        }
    }
}

module.exports.GetAllContacts = async (call, callback) => {
    console.log('-> GetAllContacts');
    try {
        const contacts = await Contact.find({}, { _id: 0, __v: 0 })
        if(contacts.length>0){
            callback(null, { contacts })
        }else{
            callback(new Error('The contact list is empty.'),{})
        }
    } catch (err) {
        callback(err)
    }
}

module.exports.GetByContactName = async (call, callback) => {
    console.log('-> GetByContactName');
    const { name } = call.request
    try {
        const contact = await Contact.findOne({ name: name })
        if (contact !== null) {
            callback(null, contact)
        } else {
            callback(new Error(`The contact named ${name} not found.`),{})
        }
    } catch (err) {
        callback(err)
    }
}

module.exports.Update = async (call, callback) => {
    console.log('-> Update');
    const { currentName, newName, newPhoneNumber } = call.request
    const update = {}
    if (newName !== '') { update.name = newName }
    if (newPhoneNumber !== '') { update.phoneNumber = newPhoneNumber }
    const filter = { name: currentName }
    const options = { new: true }

    try {
        const updatedContact = await Contact.findOneAndUpdate(filter, update, options)
        if (updatedContact !== null) {
            callback(null, updatedContact)
        } else {
            callback(new Error(`The contact named ${currentName} not found.`), {})
        }
    } catch (err) {
        callback(err)
    }
}

module.exports.Delete = async (call, callback) => {
    console.log('-> Delete');
    const { name } = call.request
    try {
        const deletedContact = await Contact.findOneAndDelete({ name })
        if (deletedContact !== null) {
            callback(null, {})
        }else{
            callback(new Error(`The contact named ${name} not found.`), {})
        }
    } catch (err) {
        callback(err)
    }
}