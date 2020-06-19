const path = require('path');
const AppEvents = require(path.join(__dirname, '../events'));
const db = require('@nicejob-db-test/nicejob-db');
const Joi = require('@hapi/joi');

class Service {
    constructor() {
        db.connect(process.env.DB_CONNECTION, process.env.DB_NAME, process.env.CACHE_SIZE, process.env.CACHE_LIFE_TIME);
    }
    async createDocument(req, res) {
        // validate input 
        const createSchema = Joi.object().keys({
            document: Joi.object().required()
        });
        const { error, value } = createSchema.validate(req.body);
        if (error) {
            console.log(error)
            return AppEvents.emit('error', req, res, { message: error });
        }
        // save new document to DB
        const collection = req.params.collection;
        const payload = {
            collection: collection,
            data: value.document
        }
        try {
            const saveResult = await db.save(payload); // Pass collection name and document
            return AppEvents.emit('success', req, res, saveResult);
        } catch (error) {
            return AppEvents.emit('error', req, res, { message: error });
        }
    }
    updateDocument(req, res) {
        req.body.title = req.params.title;
        return this.saveProject(req, res);
    }
    async findDocument(req, res) {
        const query = {};
        if (req.params.id) {
            query.id = req.params.id;
        }
        const data = { query: query, collection: req.params.collection, limit: parseInt(req.query.LIMIT) };
        try {
            const documents = await db.find(data);
            return AppEvents.emit('success', req, res, documents);
        } catch (error) {
            return AppEvents.emit('error', req, res, { message: error });
        }
    }
    check(req, res) {
        return AppEvents.emit('success', req, res, { result: { status: "OK" } });
    }
}
module.exports = new Service();