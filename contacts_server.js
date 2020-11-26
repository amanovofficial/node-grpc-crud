const PROTO_PATH = './contacts.proto'
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const mongoose = require('mongoose')
const { MONGO_URI, DB_OPTIONS } = require('./config')
const { Create, GetAllContacts, GetByContactName, Update, Delete } = require('./controllers')
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
const contacts_proto = grpc.loadPackageDefinition(packageDefinition).contacts

const server = new grpc.Server()
server.addService(contacts_proto.ContactService.service, {
    Create,
    GetAllContacts,
    GetByContactName,
    Update,
    Delete
})
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())

mongoose.connect(MONGO_URI, DB_OPTIONS)
    .then(() => {
        console.log('MongoDB is conntected...');
        server.start()
    })
    .catch((err) => {
        console.log(err);
    })
