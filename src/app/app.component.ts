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
      Phone: '3221'
    },
    {
      Id: '2',
      Name: 'Salman',
      Phone: '123'
    },
    {
      Id: '3',
      Name: 'Parastoo',
      Phone: '364289'
    },
    {
      Id: '4',
      Name: 'Reza',
      Phone: '422358'
    },
    {
      Id: '5',
      Name: 'Karim',
      Phone: '62027892'
    },
    {
      Id: '6',
      Name: 'Ali',
      Phone: '4545363'
    },
    {
      Id: '7',
      Name: 'Ramin',
      Phone: '10554'
    },
    {
      Id: '8',
      Name: 'John',
      Phone: '22456'
    },
    {
      Id: '9',
      Name: 'Test',
      Phone: '8942'
    },
    {
      Id: '10',
      Name: 'Ronaldo',
      Phone: '7862'
    },
    {
      Id: '11',
      Name: 'Messi',
      Phone: '7856532'
    },
    {
      Id: '12',
      Name: 'Totti',
      Phone: '45689'
    },
    {
      Id: '13',
      Name: 'Iniesta',
      Phone: '045325'
    },
    {
      Id: '14',
      Name: 'Arash',
      Phone: '45221045'
    },
    {
      Id: '15',
      Name: 'Karim',
      Phone: '0453456'
    },
    {
      Id: '16',
      Name: 'Kazim',
      Phone: '24543'
    },
    {
      Id: '17',
      Name: 'Behlul',
      Phone: '655438'
    },
    {
      Id: '18',
      Name: 'Karim',
      Phone: '23123'
    }
  ];
  ngOnInit() {

  }

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
