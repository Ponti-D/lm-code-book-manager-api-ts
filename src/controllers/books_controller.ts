import { Request, Response } from "express";
import * as bookService from "../services/books";

export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json("We cannot find the book with an ID you're looking!");
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;

	const bookOnShelf = await bookService.getBook(Number(bookToBeSaved.bookId));
	if (!bookOnShelf) {
		try {
			const book = await bookService.saveBook(bookToBeSaved);
			res.status(201).json(book);
		} catch (error) {
			res.status(400).json({ message: (error as Error).message });
		}
	} else {
		return res.status(400).json("A book with the same ID already exist");
	}
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	const book = await bookService.updateBook(bookId, bookUpdateData);
	res.status(204).json(book);
};

// User Story 1 - Delete Book By Id Solution
export const deleteBook = async (req: Request, res: Response) => {
	const bookId = Number.parseInt(req.params.bookId);
	const book = await bookService.deleteBook(bookId);

	if (book) {
		res.status(200).json(book);
	} else {
		res.status(404).json("No book with that ID to delete");
	}
};
