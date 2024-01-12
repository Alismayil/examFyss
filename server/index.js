import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
const { Schema } = mongoose;

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const BlogPost = new Schema({
    name: String,
    price: String,
    image: String
});

const Practic = mongoose.model('Practic', BlogPost);

app.get('/practic', async (req, res) => {
    const data = await Practic.find({})
    res.send(data)
})

app.get('/practic/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Practic.findById(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)

    }
})

app.post('/practic', async (req, res) => {
    try {
        const data = new Practic(req.body)
        await data.save()
        res.status(200).send("Create new Product")
    } catch (error) {
        res.status(404).send("Not Create new Product")
    }
})

app.delete('/practic/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Practic.findByIdAndDelete(id).exec();
        res.status(200).send("Delete Product")
    } catch (error) {
        res.status(404).send("Not Delete Product")


    }
})

mongoose.connect('mongodb+srv://AliIsmayil:ali123@cluster0.tzldidp.mongodb.net/')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})