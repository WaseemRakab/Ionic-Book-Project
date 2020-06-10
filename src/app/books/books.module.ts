import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './book-list/book-list.component';
import {BookItemComponent} from './book-list/book-item/book-item.component';
import {IonicModule} from '@ionic/angular';
import {BookPopoverComponent} from './book-popover/book-popover.component';
import {BookModalComponent} from './book-modal/book-modal.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        BookListComponent,
        BookItemComponent,
        BookPopoverComponent,
        BookModalComponent
    ],
    exports: [
        BookPopoverComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule
    ]
})
export class BooksModule {
}
