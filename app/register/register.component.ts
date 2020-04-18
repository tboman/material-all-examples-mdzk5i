import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Profile } from "../model/profile";
import { CacheService } from "../../services/cache.service";
import * as firebase from "firebase/app";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  profile: Profile;
  interests;
  fields;
  registersummary: {
    header: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
  } = {
    header: "Your Page",
    p1: ".",
    p2: ".",
    p3: ".",
    p4: ".",
    p5: "."
  };

  locations: [{key:string, value: string}];
  titles: [{key:string, value: string}];

  constructor(private fb: FormBuilder, private router: Router, private cacheService: CacheService) {
    const db = firebase.firestore();
    this.registersummary = cacheService.getArticle("registersummary");
    console.log(this.registersummary);
  }

  ngOnInit() {
    this.profile = new Profile();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      input: ["", [Validators.required]]
    });
    this.interests = [
      {
        value: "",
        en_us: "Please Select"
      }
    ];
    this.interests = this.cacheService.getInterests();
    this.locations = this.cacheService.getLocations();
    this.titles = this.cacheService.getTitles();
    this.fields = this.cacheService.getFields();
  }

  resetControl(control: string) {
    this.form.get(control).reset("");
  }

  onSubmit() {
    const db = firebase.firestore();
    this.profile.email = firebase.auth().currentUser.email;
    this.profile.creator = firebase.auth().currentUser.uid;
    this.profile.created = new Date();
    console.log(this.profile);

    db.collection("profiles")
      .add(this.profile)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    window.alert("Registration submitted, stay tuned for email.");
    this.router.navigate(["/home"]);
  }
}
