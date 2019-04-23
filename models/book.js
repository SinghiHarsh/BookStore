const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
	title:{
		type: String
	},
	genre:{
		type: String
	},
	description:{
		type: String
	},
	author:{
		type: String
	},
	pages:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
	console.log(book);
}
// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.deleteOne(query, callback);
}
