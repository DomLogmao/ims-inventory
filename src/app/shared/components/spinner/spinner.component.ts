import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {

  constructor(public loader: LoaderService){
    this.loadContent();
  }
  value = 0;
  loading = true;


  loadContent() {
    this.loading = true;
    const subs$: Subscription = interval(200).subscribe(res => {
      this.value = this.value + 10;
      if(this.value === 120) {
        subs$.unsubscribe();
        this.loading = false;
        this.value = 0;
        console.log('Ha terminado');
      }
    });
  }
}
