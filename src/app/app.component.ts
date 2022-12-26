import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm!: FormGroup;

  envs = ['US-UAT', 'EU-UAT'];
  response = '';

   //hiding repo
   isRepo:boolean = false


   //onclick toggling both
   onclickRepoCheck()
   {
     this.isRepo = !this.isRepo
   }

  data = {
    id: 1,
    env: '',
    repo: '',
    branch: '',
    eggFilePath: '',
    dbfsPath: '',
    inputJson: '',
    flowJson: ''

  };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // this.createForm();
    // this.initForm();
    this.buildForm();
  }


  createForm() {
    this.myForm = this.fb.group({
      env: '',
      repo: '',
      branch: '',
      eggFilePath: '',
      dbfsPath: '',
      inputJson: '',
      flowJson: ''
    });
  }

  initForm() {
    this.myForm.patchValue(this.data);
  }

  buildForm() {
    this.myForm = this.fb.group({
      id: this.data.id,
      env: this.data.env,
      repo: this.data.repo,
      branch: this.data.branch,
      eggFilePath: this.data.eggFilePath,
      dbfsPath: this.data.dbfsPath,
      inputJson: this.data.inputJson,
      flowJson: this.data.flowJson
    });
  }


  onSubmit(myForm: FormGroup) {
    console.log('Your form data : ', myForm.value);
    const body = myForm.value;
    this.http.post<any>('http://localhost:7777/post_data/', body).subscribe(data => {
      this.response = data;
    });
  }

}
