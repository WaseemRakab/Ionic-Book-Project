import {createReducer, on} from '@ngrx/store';
import {
    addBook,
    deleteBook,
    fetchBooksFailed,
    loadingBooks,
    saveBooksFailed,
    saveBooksSuccess,
    savingBooks,
    setBooks,
    updateBook
} from './book.actions';
import {Book} from '../book.model';

export interface State {
    loadingBooks: boolean;
    savingBooks: boolean;
    books: Book[];
    setBooksError: string;
    saveBooksError: string;
}

const initialState: State = {
    loadingBooks: false,
    savingBooks: false,
    books: [],
    setBooksError: null,
    saveBooksError: null
};

const mBookReducer = createReducer(initialState,
    on(loadingBooks, state => {
        return {
            ...state,
            loadingBooks: true
        };
    }),
    on(savingBooks, state => {
        return {
            ...state,
            savingBooks: true
        };
    }),
    on(setBooks, (state, action) => {
        return {
            ...state,
            loadingBooks: false,
            books: action.books,
            setBooksError: null
        };
    }),
    on(addBook, (state, action) => {
        return {
            ...state,
            books: [...state.books, action.book]
        };
    }),
    on(updateBook, (state, action) => {
        const bookToUpdateIndex = state.books.findIndex(book => book.bookId === action.bookId);
        const updatedBooks = [...state.books];
        updatedBooks[bookToUpdateIndex] = action.updatedBook;
        return {
            ...state,
            books: updatedBooks
        };
    }),
    on(deleteBook, (state, action) => {
        const updatedBooks = state.books.filter(book => book.bookId !== action.bookId);
        return {
            ...state,
            books: updatedBooks
        };
    }),
    on(saveBooksSuccess, (state) => {
        return {
            ...state,
            savingBooks: false,
            saveBooksError: null
        };
    }),
    on(fetchBooksFailed, (state, action) => {
        return {
            ...state,
            setBooksError: action.reason,
            loadingBooks: false
        };
    }),
    on(saveBooksFailed, (state, action) => {
        return {
            ...state,
            saveBooksError: action.reason,
            savingBooks: false
        };
    })
);

export function bookReducer(state, action) {
    return mBookReducer(state, action);
}
