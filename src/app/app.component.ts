import { Component } from '@angular/core';
import { IPagingInput } from 'ngx-magic-table/lib/models/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public sortDirection: SortDirection = SortDirection.Ascending;

  public count: Number = 1;
  //  public data: Array<any> = [];
  public data: Array<any> = [
    {
      Id: '1',
      Name: 'Nabi',
      Phone: '+12 345 678',
      Size: [
        'small', 'medium', 'large'
      ],
      Type: [
        'Man', 'Woman'
      ]
    }, {
      Id: '2',
      Name: 'Noushmac',
      Phone: '+52 221 983',
      Size: [
        'small', 'medium', 'large', 'x large'
      ],
      Type: [
        'Man', 'Woman', 'Child'
      ]
    },
    {
      Id: '3',
      Name: 'Kazim',
      Phone: '+80 235 874',
      Size: [
        'small'
      ],
      Type: [
        'Man', 'NewBorn'
      ]
    },
    {
      Id: '4',
      Name: 'Davood',
      Phone: '+73 214 365',
      Size: [
        'small', 'large'
      ],
      Type: [
        'Man', 'Woman'
      ]
    },
    {
      Id: '5',
      Name: 'Mammad',
      Phone: '+21 332 236',
      Size: [
        'small', 'large', 'x small'
      ],
      Type: [
        'Man', 'Woman'
      ]
    },
    {
      Id: '6',
      Name: 'Sarah',
      Phone: '+21 324 236',
      Size: [
        'small'
      ],
      Type: [
        'Woman'
      ]
    },
    {
      Id: '7',
      Name: 'Davood',
      Phone: '+73 214 365',
      Size: [
        'small', 'large'
      ],
      Type: [
        'Man', 'Woman'
      ]
    },
    {
      Id: '8',
      Name: 'Davood',
      Phone: '+73 214 365',
      Size: [
        'small', 'large'
      ],
      Type: [
        'Man', 'Woman'
      ]
    }
  ];

  pageChanged() {

  }

  sortChanged() {

  }

  selectChanged(row: any) {
    alert(JSON.stringify(row));
  }

  logAll(data: IPagingInput) {
    console.log('************************');
    console.log(data);
  }
}
export enum SortDirection {
  Unspecified = -1,
  Ascending = 0,
  Descending = 1,
}
