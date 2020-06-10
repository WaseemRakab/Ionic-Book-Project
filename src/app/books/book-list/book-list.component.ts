import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {Observable} from 'rxjs';
import {Book} from '../book.model';
import {BookModalComponent} from '../book-modal/book-modal.component';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {

    constructor(private bookService: BookService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.bookService.fetchBooks();
    }

    get books(): Observable<Book[]> {
        return this.bookService.getBooks();
    }

    get loadingBooks() {
        return this.bookService.isLoadingBooks();
    }

    public async editBookModal(book: Book) {
        const modalRef = await this.modalController
            .create
            (
                {
                    component: BookModalComponent,
                    animated: true,
                    swipeToClose: false,
                    componentProps: {
                        editMode: true,
                        book
                    },
                    backdropDismiss: false,
                    keyboardClose: false
                }
            );
        await modalRef.present();
    }

    removeBook(bookId: string) {
        this.bookService.removeBook(bookId);
    }

    refreshBooks() {
        this.bookService.fetchBooks();
    }
}
