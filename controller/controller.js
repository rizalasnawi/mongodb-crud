const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'library';


class Controller {

    static showBook (req, res) {
        MongoClient.connect(url, function (err, client) {
            console.log('Berhasil connect ke server');

            const db = client.db(dbName);
            const book = db.collection('books');

            book
                .find({})
                .toArray(function (err, books){
                    if(err) {
                       res.status(500).json({err : err})
                       client.close()
                    } else {
                        res.status(200).json(books)
                        client.close()
                    }
                })
        }) 
    }

    static createBook (req, res) {
        MongoClient.connect(url, function(err, client) {
            console.log('Berhasil connect ke server');

            const db = client.db(dbName);
            const book = db.collection('books');

            let data = {
                isbn : req.body.isbn,
                title : req.body.title,
                author : req.body.author,
                category : req.body.category,
                stock : req.body.stock
            }

            book
                .insertOne(data, function (err, books){
                    if(err){
                      res.status(500).json({err : err})
                      client.close()
                    } else {
                       res.status(200).json({message : `Insert new book success`})
                        client.close()
                    }
                })
        })
    }

    static updateBook (req, res) {
        MongoClient.connect(url, function (err, client) {
            console.log('Berhasil connect ke server');

            const db = client.db(dbName);
            const book = db.collection('books');

            let data = {
                isbn : req.body.isbn,
                title : req.body.title,
                author : req.body.author,
                category : req.body.category,
                stock : req.body.stock
            }

            book.updateOne({_id : ObjectId(req.params.id)}, {$set: data}, (err, result) => {

                if(err) {
                   res.status(500).json({err : err});
                   client.close();
                } else {
                    if(result.matchedCount == 1) {
                        res.status(200).json({message : `Data ${req.params.id} updated succesfully`});
                        client.close();
                    } else {
                        res.status(404).json({message : `Data not found`});
                        client.close();
                    }
                }
            })
        })
    }

    static deleteBook (req, res) {
        MongoClient.connect(url, function (err, client){
            console.log('Berhasil connect ke server');

            const db = client.db(dbName);
            const book = db.collection('books');

            book.deleteOne({_id : ObjectId(req.params.id)}, (err, result) => {
                if(err){
                  res.status(500).json({err:err});
                  client.close();
                } else {
                    if(result.deletedCount == 1){
                       res.status(200).json({message : `Data ${req.params.id} deleted succesfullly`});
                       client.close();
                    } else {
                        res.status(404).json({message : `Data not found`});
                        client.close();
                    }
                }
            })
        })
    }

    static findAndUpdateBook (req, res) {
        MongoClient.connect(url, function(err, client) {
            console.log('Berhasil connect ke server');

            const db = client.db(dbName);
            const book = db.collection('books');

            book.findOneAndUpdate({isbn : '111111'}, {
                $set : {
                    isbn : req.body.isbn,
                    title : req.body.title,
                    author : req.body.author,
                    category : req.body.category,
                    stock : req.body.stock
                }}, {sort : {_id : -1}
                }, (err, result) => {
                    if(err){
                      res.status(500).json({message : 'Error update'});
                      client.close();
                    } else {
                        res.status(200).json({message : `Data updated succesfully`});
                        client.close();
                    }
                })
        })

    }

}

module.exports = Controller