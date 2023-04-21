import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
  standalone: true,
})
export class CabeceraComponent {

  @Input() titulo :string = '';
}
