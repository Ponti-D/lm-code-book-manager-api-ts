import express from "express";
import * as booksController from "../controllers/books_controller";

export const router = express.Router();
router.get("/books", booksController.getBooks);
router.get("/books/:bookId", booksController.getBook);
router.post("/books", booksController.saveBook);

// User Story 4 - Update Book By Id Solution
router.put("/books/:bookId", booksController.updateBook);

//delete - user story 1
router.delete("/books/:bookId", booksController.deleteBook);
