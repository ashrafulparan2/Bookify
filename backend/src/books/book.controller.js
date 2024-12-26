const Book = require('./book.model');

const postABook = async(req, res) => {
    try{
        const newBook = await Book({...req.body})
        await newBook.save()
        res.status(200).send({message: "Book posted successfully", book : newBook})
        // console.log("Successful")
    } catch(error){
        console.error("Error creating book", error)
        res.status(500).send({message: "Failed to create book"})
    }
}


const getAllBooks = async(req, res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1})
        res.status(200).send(books)
    } catch(error){
        console.error("Error finding books", error)
        res.status(500).send({message : "Failed to fetch books"})

    }
}
module.exports = {
    postABook,
    getAllBooks
}