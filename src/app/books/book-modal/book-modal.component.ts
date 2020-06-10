import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../book.service';
import {AlertController, ModalController} from '@ionic/angular';
import {Book} from '../book.model';

@Component({
    selector: 'app-book-modal',
    templateUrl: './book-modal.component.html',
    styleUrls: ['./book-modal.component.scss'],
})
export class BookModalComponent implements OnInit {

    @Input() editMode: boolean;
    @Input() book: Book;

    bookForm: FormGroup;

    modalRef: HTMLIonModalElement;

    constructor(private bookService: BookService,
                private modalController: ModalController,
                private alertController: AlertController) {
    }

    async ngOnInit() {
        this.bookForm = new FormGroup({
            bookName: new FormControl(this.book?.bookName, [Validators.required, Validators.minLength(3)]),
            bookAuthor: new FormControl(this.book?.bookAuthor, [Validators.required, Validators.minLength(5)]),
            bookContent: new FormControl(this.book?.bookContent, [
                Validators.required,
                Validators.minLength(10), Validators.maxLength(600)
            ])
        });
        this.modalRef = await this.modalController.getTop();
    }

    async submitBook() {
        if (this.bookForm.invalid) {
            return;
        }
        const bookValue = this.bookForm.value;
        const book: Book = {
            bookId: this.book?.bookId,
            bookName: bookValue.bookName,
            bookAuthor: bookValue.bookAuthor,
            bookContent: bookValue.bookContent
        };
        if (!this.editMode) {
            this.bookService.addBook(book);
            return await this.closeModal();
        }
        this.bookService.updateBook(book.bookId, book);
        return await this.modalRef.dismiss();
    }

    get dirtyAndTouched() {
        return this.bookForm.dirty && this.bookForm.touched;
    }

    errorHandlingInput(formControlName: string, formValidationType: string) {
        const currFormControl = this.bookForm.get(formControlName);
        return this.dirtyAndTouched && currFormControl.hasError(formValidationType);
    }

    async closeModal() {
        if (!this.editMode) {
            return await this.modalRef.dismiss();
        }
        // it the values untouched, not needed to verify changes
        if (!this.dirtyAndTouched) {
            return await this.modalRef.dismiss();
        }
        // Confirming if the user wants to discard changes
        const alert = await this.alertController
            .create({
                animated: true,
                header: 'Confirmation',
                buttons: [
                    {
                        text: 'Yes',
                        // close Book Modal On Confirmed
                        handler: async () => {
                            await this.modalRef.dismiss();
                        }
                    },
                    {
                        text: 'No'
                    }
                ],
                message: 'Are you sure you want to discard the changes?'
            });
        // Render alert to DOM
        await alert.present();
    }
}
