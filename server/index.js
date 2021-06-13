import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRoutes from './routes/student.js';

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended:true}));
app.use('/students', studentRoutes);



//Connection string for monogoDB 
const CONNECTION_URL = 'mongodb+srv://atharvaagrawal:Atharva@12345@cluster0.ylfkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () =>
    console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message))

//To avoid warnings in console
mongoose.set('useFindAndModify', false);