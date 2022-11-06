import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';
  inSubmission = false;

  credentials = {
    email: '',
    password: ''
  }

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Loggin in ...'
    this.alertColor = 'blue'
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (e) {
      this.showAlert = true;
      this.alertMsg = 'Invalid Credentials. Please try again.'
      this.alertColor = 'red'
      this.inSubmission = false;
      return
    }
    
    this.alertMsg = 'Log in successful!';
    this.alertColor = 'green';
  }
}
