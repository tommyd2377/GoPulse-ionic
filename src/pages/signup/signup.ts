import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  private userForm: FormGroup;
  email: string;
  password: string;
  displayName: string;
  fullName: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private fb: FormBuilder) {
                this.afAuth.authState.subscribe( (user) => {
                  if (user) {
                    this.navCtrl.setRoot(TabsPage,{})
                  }
                })

                this.userForm = this.fb.group({
                  'email': ['', [
                      Validators.required,
                      Validators.email
                    ]
                  ],
                  
                
                  'password': ['', [
                    Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                    Validators.minLength(8),
                    Validators.maxLength(40)
                  ]
                ],
                });
                this.userForm.valueChanges.subscribe(data => 
                  this.onValueChanged(data));
                  this.onValueChanged();
  }

  createUser() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        let user = firebase.auth().currentUser
        user.sendEmailVerification();
        user.updateProfile({
          displayName: (this.displayName),
          photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROB37n5Wb_TTtHjAJoQq319S29DJT4tlthJQrp0tqfotqac6nL',
        })
      let uid = user.uid;
      const userData = this.db.object('user-data/' + uid);
      userData.set({ fullname: (this.fullName), displayName: (this.displayName), 
      email: (this.email), uid: (uid)});
      })
      .catch(error => console.log(error));
  }
  
  onValueChanged(data?: any) {
    if (!this.userForm) { 
      return; 
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  
  formErrors = {
    'email': '',
    'password': ''
  };
  
  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Must be a valid email.'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include one letter and one number.',
      'minlength':     'Password must be at least 8 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };
}




