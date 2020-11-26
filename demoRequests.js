const client = require('./contacts_client')

// Создание нового контакта
const newContact = {
    name: 'Julia',
    phoneNumber: '+117327030101'
}
client.Create(newContact,createCallback)


// Получение списка всех контактов
// client.GetAllContacts({},getAllContactsCallback)

// Получение контакта по его имени
let name = 'Julia'
// client.GetByContactName({name},getByContactNameCallback)

// Обновление контакта
const updateableContact = {
    currentName: 'Julia',// имя контакта(объязательный параметр)
    newName: 'Sofia',// новое имя(не объязательный параметр)
    newPhoneNumber: '+998970000000' // новое имя(не объязательный параметр)
}
// client.Update(updateableContact,updateCallback)

// Удаление контакта
    name = 'Sofia' //имя удаляемого контакта
// client.Delete({name},deleteCallback)



function createCallback(err, contact) {
    if (!err) {
        console.log('Contact is created!');
        console.log(contact);
    } else {
        console.log(err.details);
    }
}


function getAllContactsCallback(err, contacts) {
    if (!err) {
        console.log(contacts);
    } else {
        console.log('Error');
        console.log(er.details);
    }
}

function getByContactNameCallback(err, contact) {
    if (!err) {
        console.log(contact);
    } else {
        console.log('Error');
        console.log(err.details);
    }
}


function updateCallback(err, contact) {
    if (!err) {
        console.log('Contact is updated!');
        console.log(contact);
    } else {
        console.log('Error');
        console.log(err.details);
    }
}


function deleteCallback(err, response) {
    if (!err) {
        console.log('Contact is deleted!');
    } else {
        console.log('Error');
        console.log(err.details);
    }
}