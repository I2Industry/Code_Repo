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

  //hiding egg_build
  isBuild:boolean = false

  //onclick toggling both
   onclickBuildCheck()
   {
     this.isBuild = !this.isBuild
   }

   //hiding egg_build
  isTaskFlow:boolean = false

  //onclick toggling both
   onclickTaskFlowCheck()
   {
     this.isTaskFlow = !this.isTaskFlow
   }

    //hiding egg_build
  isTaskDQ:boolean = false

  //onclick toggling both
   onclickTaskDQCheck()
   {
     this.isTaskDQ = !this.isTaskDQ
   }
  data = {
    id: 1,
    env: '',
    repo: '',
    branch: '',
    localPath:'',
    eggFilePath: '',
    dbfsPath: '',
    inputJson: '',
    flowJson: '',
    inputDqJson:''

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
      localPath:'',
      eggFilePath: '',
      dbfsPath: '',
      inputJson: '',
      flowJson: '',
      inputDqJson:''
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
      localPath: this.data.localPath,
      eggFilePath: this.data.eggFilePath,
      dbfsPath: this.data.dbfsPath,
      inputJson: this.data.inputJson,
      flowJson: this.data.flowJson,
      inputDqJson:this.data.inputDqJson
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
