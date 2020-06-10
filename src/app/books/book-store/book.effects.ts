import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    fetchBooks,
    fetchBooksFailed,
    loadingBooks,
    saveBooks,
    saveBooksFailed,
    saveBooksSuccess,
    savingBooks,
    setBooks
} from './book.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Book, BookData, mapBooksDataToBooks, mapBooksToBooksData} from '../book.model';
import {of} from 'rxjs';

@Injectable()
export class BookEffects {
    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<AppState>) {
    }

    fetchBooksEffect = createEffect(() =>
        this.actions$
            .pipe
            (
                ofType(fetchBooks),
                tap(() => {
                    this.store.dispatch(loadingBooks());
                }),
                switchMap(() => {
                    return this.httpClient.get<BookData>(`${environment.firebaseBookUrl}/books.json`)
                        .pipe
                        (
                            map((booksDataResponse) => {
                                if (!booksDataResponse) {
                                    return [];
                                }
                                return mapBooksDataToBooks(booksDataResponse);
                            })
                        );
                }),
                map((books: Book[]) => {
                        return setBooks({books});
                    }
                ),
                catchError((err => {
                    return of(fetchBooksFailed({reason: err?.error?.error || 'Unknown Error Occurred, Try Again Later !'}));
                }))
            )
    );

    saveBooksEffect = createEffect(() =>
        this.actions$.pipe
        (
            ofType(saveBooks),
            tap(() => {
                this.store.dispatch(savingBooks());
            }),
            withLatestFrom(this.store.select('book')),
            map(([, bookState]) => {
                return mapBooksToBooksData(bookState.books);
            }),
            switchMap((booksData: BookData) => {
                return this.httpClient.put(`${environment.firebaseBookUrl}/books.json`, booksData);
            }),
            map(() => {
                return saveBooksSuccess();
            }),
            catchError(err => {
                return of(saveBooksFailed({reason: err?.error?.error || 'Unknown Error Occurred, Try Again Later !'}));
            })
        )
    );
}
