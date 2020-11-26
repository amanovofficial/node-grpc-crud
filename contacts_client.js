const PROTO_PATH = './contacts.proto'
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

const contacts = grpc.loadPackageDefinition(packageDefinition).contacts
const client = new contacts.ContactService('0.0.0.0:50051', grpc.credentials.createInsecure())
module.exports = client