import express from 'express'
import devBundle from './devBundle'
import path from 'path'
import template from '../template'
import { MongoClient } from 'mongodb'
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
MongoClient.connect(url, (err, db) => {
    if (err) {
        console.error('Unable to connect to MongoDB server.')
    }else{
        console.log('Connected to MongoDB server.')
        db.close();
    }
   
})
const CURRENT_WQRKING_DIR = process.cwd()
let port = process.env.PORT || 3000
const app = express()
devBundle.compile(app)



app.use('/dist',
express.static(path.join(CURRENT_WQRKING_DIR,
'dist')))
app.get('/', (req, res) => {
    res.status(200).send(template())
})
app.listen(port, function onStart(err){
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s', port)
})
