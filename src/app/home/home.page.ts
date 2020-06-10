import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {BookPopoverComponent} from '../books/book-popover/book-popover.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(private popoverController: PopoverController) {
    }

    async popOver(event) {
        const popoverRef = await this.popoverController.create({
            animated: true,
            component: BookPopoverComponent,
            translucent: true,
            event
        });
        await popoverRef.present();
    }
}
