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
    },
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
    },
    {
      Id: '1',
      Name: '41521314',
      Phone: '3221',
      Data: [
        'small', 'me52542dium', 'larg452e'
      ],
      Data2: [
        'Men', 'Women', 'Men', 'Women'
      ]
    },
    {
      Id: '456423',
      Name: 'asdsaasdas',
      Phone: '51231364',
      Data: [
        '55555', '5', '0gfh',
        'ss', '5', '0gfh', 'asdasd',
        '55555', '5', '0gfh',
        '555a55', '5', '0gfh',
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
