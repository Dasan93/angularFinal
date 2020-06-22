import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-example-component',
  templateUrl: './dialog-example-component.component.html',
  styleUrls: ['./dialog-example-component.component.scss']
})
export class DialogExampleComponentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
