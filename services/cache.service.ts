import { Injectable } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";

@Injectable()
export class CacheService {
  locations;
  titles;
  articles: {
    key: string;
    header: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
  }[];
  fields: { key: string; value: string }[] = [
    {
      key: "",
      value: "Please Select"
    }
  ];
  request_interests: { key: string; value: string }[] = [
    {
      key: "",
      value: "Please Select"
    }
  ];
  offer_interests: { key: string; value: string }[] = [
    {
      key: "",
      value: "Please Select"
    }
  ];

  interests_raw: [{ key: string; en_us_title: string; fr_fr_title: string }];

  constructor() {
    this.interests_raw = [{ key: "", en_us_title: "", fr_fr_title: "" }];
    const db = firebase.firestore();
    db.collection("fields")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.addField(doc);
        });
      });
    db.collection("interests")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.addInterest(doc);
        });
      });
    db.collection("articles")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.addArticle(doc);
        });
      });
  }

  public getLocations() {
    if (!this.locations) {
      this.locations = [
        {
          key: "",
          value: "Please Select"
        },
        {
          key: "us",
          value: "United States of America"
        },
        {
          key: "eu",
          value: "European Union Country"
        },
        {
          key: "ca",
          value: "Canada"
        },
        {
          key: "sa",
          value: "South America"
        },
        {
          key: "oth",
          value: "Other (please note in comment field which country)"
        }
      ];
    }
    return this.locations;
  }

  public getTitles() {
    if (!this.titles) {
      this.titles = [
        {
          key: "",
          value: "Please Select"
        },
        {
          key: "researcher",
          value: "Researcher at private institution"
        },
        {
          key: "junior",
          value: "Junior faculty member at a university/research institution"
        },
        {
          key: "senior",
          value: "Senior faculty member at a university/research institution"
        },
        {
          key: "fellow",
          value: "Postdoctoral fellow"
        },
        {
          key: "lecturer",
          value: "Lecturer"
        },
        {
          key: "oth",
          value:
            "Other (please note in comment field which title you would like to use)"
        }
      ];
    }
    return this.titles;
  }
  public getFields() {
    return this.fields;
  }
  addField(doc) {
    var field = { key: "", value: "" };
    field.key = doc.data().key;
    field.value = doc.data().en_us_title + ": " + doc.data().en_us_desc;
    this.fields.push(field);
  }
  addArticle(doc) {
    var article = { key: "", header: "", p1: "", p2: "", p3: "", p4: "" };
    article.key = doc.data().key;
    article.header = doc.data().en_header;
    article.p1 = doc.data().en_data_1;
    article.p2 = doc.data().en_data_2;
    article.p3 = doc.data().en_data_3;
    article.p4 = doc.data().en_data_4;
    if (!this.articles) {
          this.articles = [{ key: "", header: "", p1: "", p2: "", p3: "", p4: "" }];
    }
    this.articles.push(article);
  }
  public getInterests() {
    return this.request_interests;
  }
  public getInterestsRaw() {
    return this.interests_raw;
  }
  public getArticle(key) {
    if (!this.articles) {
      var db = firebase.firestore();
      db.collection("articles")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.addArticle(doc);
          });
        });
    }
    if (this.articles) {
      console.log(this.articles);
      var article = this.articles.find(article => article.key === key);
      if (article) {
        return article;
      }
    }
  }
  addInterest(doc) {
    var interest = { key: "", value: "" };
    interest.key = doc.data().key;
    interest.value = doc.data().en_us_title + ": " + doc.data().en_us_desc;
    if (
      doc.data().type &&
      (doc.data().type == "request" || doc.data().type == "both")
    ) {
      this.request_interests.push(interest);
    }
    this.interests_raw.push(doc.data());
  }
}
