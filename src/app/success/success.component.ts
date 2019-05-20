import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  
  @Input() message
  constructor() { }

  ngOnInit() {
    this.message= "Thank you for successfully registering your organisation in the V Sampark Network of Corporates.Someone from V Sampark will get in touch will you shortly!"
  }

}
