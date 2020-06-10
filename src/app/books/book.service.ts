import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {addBook, deleteBook, fetchBooks, saveBooks, updateBook} from './book-store/book.actions';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Book} from './book.model';
import {v4 as generateId} from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private store: Store<AppState>) {
    }

    public isLoadingBooks(): Observable<boolean> {
        return this.store
            .pipe
            (
                select('book'),
                map(bookState => bookState.loadingBooks)
            );
    }

    public fetchBooks() {
        this.store.dispatch(fetchBooks());
    }

    public getBooks() {
        return this.store
            .pipe
            (
                select('book'),
                map(bookState => bookState.books)
            );
    }

    public addBook(bookModel: Book) {
        const bookId = generateId();
        const book: Book = {
            bookId,
            bookContent: bookModel.bookContent,
            bookAuthor: bookModel.bookAuthor,
            bookName: bookModel.bookName
        };
        this.store.dispatch(addBook({book}));
    }

    public updateBook(bookId: string, updatedBook: Book) {
        this.store.dispatch(updateBook({bookId, updatedBook}));
    }

    public removeBook(bookId: string) {
        this.store.dispatch(deleteBook({bookId}));
    }

    public saveBooksState() {
        this.store.dispatch(saveBooks());
    }

    public watchSavingBooks() {
        return this.store.select('book')
            .pipe(map(state => {
                    return {
                        savingBooks: state.savingBooks,
                        saveBooksError: state.saveBooksError
                    };
                }),
                map(status => {
                    return {
                        success: !status.savingBooks && !status.saveBooksError,
                        error: status.saveBooksError
                    };
                })
            );
    }
}
