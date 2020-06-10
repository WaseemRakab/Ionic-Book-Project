import {ActionReducerMap} from '@ngrx/store';
import * as fromBook from '../books/book-store/book.reducer';

export interface AppState {
    book: fromBook.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
    book: fromBook.bookReducer
};
