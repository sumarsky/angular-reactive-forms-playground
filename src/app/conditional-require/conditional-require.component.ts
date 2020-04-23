import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-conditional-require",
  templateUrl: "./conditional-require.component.html",
  styleUrls: ["./conditional-require.component.css"],
})
export class ConditionalRequireComponent implements OnInit {
  form: FormGroup;

  get isActive() {
    return this.form.controls["isActive"];
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      isActive: false,
      name: null,
    });
  }

  ngOnInit(): void {}
}
