const mongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const dbOper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbName = 'conFusion'


mongoClient.connect(url, (err, client) => {
    assert.equal(err, null)

    console.log("Connected correctly to the server");

    const db = client.db(dbName)
    dbOper.insertDocument(db, {name: "Joline", desc: "test"}, 'dishes', (result) => {

        console.log("Insert document\n", result.ops);

        dbOper.findDocuments(db, 'dishes', (docs) => {
            console.log("Found documents:\n", docs);

            dbOper.updateDocument(db, { name: "Joline" }, { desc: "Updated test" }, 'dishes', (result) => {
                console.log("Updated document:\n", result.result);

                dbOper.findDocuments(db, 'dishes', (docs) => {
                    console.log("Found documents:\n", docs);

                    db.dropCollection('dishes', (result) => {
                        console.log("Dropped collection:\n", result);

                        client.close()
                    })
                })
            })
        })
    })

})