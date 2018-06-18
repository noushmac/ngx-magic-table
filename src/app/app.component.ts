import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public count: Number = 1;
  public data: Array<any> = [
    {
      Id: '1',
      Name: 'Nabi',
      Phone: '3221',
      Data: [
        'small', 'medium', 'large'
      ],
      Data2: [
        'Men', 'Women'
      ]
    },
    {
      Id: '2',
      Name: 'N1121abi',
      Phone: '564',
      Data: [
        '55555', '5', '0gfh',
        '55555', '5', '0gfh',
        '55555', '5', '0gfh',
        '55555', '5', '0gfh',
        '55555', '5', '0gfh',
        '55555', '5', '0gfh'
      ],
      Data2: [
        'awe', 'cxcbb',
        'awe', 'cxcbb'

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

  logAll(data: any) {
    console.log('table triggered event');
    console.log(data);
  }
}
