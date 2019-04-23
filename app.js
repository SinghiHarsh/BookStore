const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

const Book =require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://harsh:harsh1234@ds135726.mlab.com:35726/bookstore',
{useNewUrlParser: true},(err)=>{
	if (err)
	{
		console.log(err);
	}
	console.log("Connected to MLABS")
});

var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});


app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
