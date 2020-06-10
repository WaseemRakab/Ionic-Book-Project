import {createAction, props} from '@ngrx/store';
import {Book} from '../book.model';


// Loading Actions
export const loadingBooks = createAction('[Book] Loading Books State');
export const savingBooks = createAction('[Book] Saving Books State');

// Side Effects Actions
export const saveBooks = createAction('[Book] Save Books');
export const fetchBooks = createAction('[Book] Fetch Books');

// CRUD
export const setBooks = createAction('[Book] Set Books', props<{ books: Book[] }>());
export const addBook = createAction('[Book] Add Book Start', props<{ book: Book }>());
export const updateBook = createAction('[Book] Update Book', props<{ bookId: string, updatedBook: Book }>());
export const deleteBook = createAction('[Book] Delete Book', props<{ bookId: string }>());

// Status Actions
export const fetchBooksFailed = createAction('[Book] Fetch Books Failed', props<{ reason: string }>());
export const saveBooksSuccess = createAction('[Book] Save Books Success');
export const saveBooksFailed = createAction('[Book] Save Books Failed', props<{ reason: string }>());
