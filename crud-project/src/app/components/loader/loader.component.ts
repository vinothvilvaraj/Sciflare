import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-loader',
    template: `
    <div >
      <span class="loading-comment" *ngIf="loader">
        <img src="assets/loader.gif"></span>
    </div>
    `,
    styles: [`
    .loading-comment {
        position: absolute;
        inset: -10px;
        background: rgba(255,255,255,.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        min-height: 200px;
    }
    .loading-comment img {
        width: 80px;
    }
    `],
})

export class LoaderViewComponent {

    @Input() loader: any;

    constructor() {
    }
}
