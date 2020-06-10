import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, PopoverController} from '@ionic/angular';
import {BookModalComponent} from '../book-modal/book-modal.component';
import {BookService} from '../book.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-book-popover',
    templateUrl: './book-popover.component.html',
    styleUrls: ['./book-popover.component.scss'],
})
export class BookPopoverComponent implements OnDestroy, OnInit {

    private popOverRef: HTMLIonPopoverElement;

    private watchStatusSub: Subscription;

    constructor(private modalController: ModalController,
                private bookService: BookService,
                private loadingController: LoadingController,
                private popoverController: PopoverController) {
    }


    async ngOnInit() {
        this.popOverRef = await this.popoverController.getTop();
    }


    public async newBookModal() {
        await this.popOverRef.dismiss();
        const modalRef = await this.modalController.create({
            component: BookModalComponent,
            animated: true,
            swipeToClose: false,
            componentProps: {
                editMode: false
            },
            backdropDismiss: false,
            keyboardClose: false
        });
        await modalRef.present();
    }

    public async saveBooksState() {
        await this.popOverRef.dismiss();
        const loadingRef = await this.loadingController.create(
            {
                spinner: 'circular',
                animated: true,
                message: 'Saving books...',
                translucent: true
            });
        await loadingRef.present();
        this.bookService.saveBooksState();
        this.watchStatusSub = this.bookService
            .watchSavingBooks()
            .subscribe(status => {
                    if (status.error) {
                        loadingRef.message = status.error || 'Unknown Error Occurred';
                        loadingRef.spinner = null;
                        setTimeout(async () => await loadingRef.dismiss(), 800);
                        return this.watchStatusSub.unsubscribe();
                    }
                    if (status.success) {
                        loadingRef.message = 'Books Saved Successfully!';
                        loadingRef.spinner = null;
                        setTimeout(async () => await loadingRef.dismiss(), 800);
                        this.watchStatusSub.unsubscribe();
                    }
                }
            );
    }

    ngOnDestroy() {
        if (this.watchStatusSub) {
            this.watchStatusSub.unsubscribe();
        }
    }

    async dismissPopover() {
        await this.popOverRef.dismiss();
    }
}
