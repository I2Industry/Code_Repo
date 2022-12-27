import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm!: FormGroup;
  isForum = true;
  envs = ['US-UAT', 'EU-UAT'];
  response = '';

  //hiding repo
  isRepo: boolean = false


  //onclick toggling both
  onclickRepoCheck() {
    this.isRepo = !this.isRepo
  }

  //hiding egg_build
  isBuild: boolean = false

  //onclick toggling both
  onclickBuildCheck() {
    this.isBuild = !this.isBuild
  }

  //hiding egg_build
  isTaskFlow: boolean = false

  //onclick toggling both
  onclickTaskFlowCheck() {
    this.isTaskFlow = !this.isTaskFlow
  }

  //hiding egg_build
  isTaskDQ: boolean = false

  //onclick toggling both
  onclickTaskDQCheck() {
    this.isTaskDQ = !this.isTaskDQ
  }
  data = {
    id: 1,
    env: '',
    repo: '',
    branch: '',
    localPath: '',
    eggFilePath: '',
    dbfsPath: '',
    inputJson: '',
    flowJson: '',
    inputDqJson: '',
    isRepo: false,
    isTaskFlow: false,
    isTaskDQ: false,
    isBuild: false

  };

  responseObj = {
    task_env_region: '',
    task_name: '',
    databricks_runid: 0,
    databricks_link: '',
    databricks_state: '',
    databricks_log: ''
  }

  responseObjArr: any = [
    {
      "task_env_region": "EU-UAT",
      "task_name": "CS_AMS_INTERACTION_MATRIX",
      "databricks_runid": 68217538,
      "databricks_link": "https://adb-5892249866138306.6.azuredatabricks.net/?o=5892249866138306#job/30363921008757/run/68217538",
      "databricks_state": "SUCCESS",
      "databricks_log": "test log"
    }
  ];


  columnDefs = [
    {
      "headerName": "Id",
      "headerTooltip": "Id",
      "field": "databricks_runid",
      "width": 100,
      "resizable": true,
      "tooltipField": "id"
    },
    {
      "headerName": "ENV",
      "headerTooltip": "task_env_region",
      "field": "task_env_region",
      "width": 100,
      "resizable": true,
      "tooltipField": "task_env_region"
    },
    {
      "headerName": "Status",
      "headerTooltip": "databricks_state",
      "field": "databricks_state",
      "width": 100,
      "resizable": true,
      "tooltipField": "databricks_state"
    },
    {
      "headerName": "Batabricks link",
      "headerTooltip": "databricks_link",
      "field": "databricks_link",
      "cellRenderer":(params: ICellRendererParams) => {
        params.data  
        return `<a href="${params.data.databricks_link}">${params.value}</a>`},
      "width": 350,
      "resizable": true,
      "tooltipField": "databricks_link"
    },
    {
      "headerName": "Task Name",
      "headerTooltip": "task_name",
      "field": "task_name",
      "width": 250,
      "resizable": true,
      "tooltipField": "task_name"
    },
    {
      "headerName": "Databricks Log",
      "headerTooltip": "databricks_log",
      "field": "databricks_log",
      "width": 300,
      "resizable": true,
      "tooltipField": "databricks_log"
    },

  ]

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
      localPath: '',
      eggFilePath: '',
      dbfsPath: '',
      inputJson: '',
      flowJson: '',
      inputDqJson: '',
      isRepo: false,
      isTaskFlow: false,
      isTaskDQ: false,
      isBuild: false

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
      inputDqJson: this.data.inputDqJson,
      isRepo: this.data.isRepo,
      isTaskFlow: this.data.isTaskFlow,
      isTaskDQ: this.data.isTaskDQ,
      isBuild: this.data.isBuild

    });
  }

  onSubmit(myForm: FormGroup) {
    console.log('Your form data : ', myForm.value);
    const body = myForm.value;
    this.http.post<any>('http://localhost:7777/post_data/', body).subscribe(data => {
      this.response = data;
    });
  }

  onClickResult(){
    this.isForum=false;
    this.http.get<any>('http://localhost:7777/result_data').subscribe(data => {
      this.responseObjArr = data;
    });
  }

}
