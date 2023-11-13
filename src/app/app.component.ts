import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataArray, DataObject, MatSelectData, ParentData } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mockup Json Data Generator';

  currentData: ParentData = {
    dataArrays: [],
    dataObjects: []
  };
  currentObjectData: DataObject[] = [];
  currentArrayData: DataArray = {
    name: '',
    dataObjects: [],
    dataArrays: []
  };

  inputParentForm: FormGroup = this.fb.group({
    objectsFormArray: this.fb.array([]),
    arrayFormArray: this.fb.array([])
  })

  dataTypes: MatSelectData[] = [
    { value: 'String', viewValue: 'String' },
    { value: 'Number', viewValue: 'Number' },
    { value: 'Array', viewValue: 'Array' },
  ]

  constructor(
    private fb: FormBuilder
  ) { }

  // Form Array Declarations
  objects(): FormArray {
    return this.inputParentForm.get('objectsFormArray') as FormArray;
  }

  primaryArrays(): FormArray {
    return this.inputParentForm.get('arrayFormArray') as FormArray;
  }

  primaryArrayObjects(index: number): FormArray {
    return this.primaryArrays()
      .at(index)
      .get('arrayObjectsFormArray') as FormArray;
  }

  nestedArrayObjects(index: number, secondIndex: number): FormArray {
    return this.nestedArrays(index).at(secondIndex).get('arrayObjectsNestedFormArray') as FormArray;
  }

  nestedArrays(index: number): FormArray {
    return this.primaryArrays()
      .at(index)
      .get('dataArrays') as FormArray;
  }

  rootLevelArray(): FormGroup {
    return this.fb.group({
      arrayNameCtrl: [null, Validators.required],
      arrayObjectsFormArray: this.fb.array([]),
      dataArrays: this.fb.array([])
    });
  }

  newNestedArray(): FormGroup {
    return this.fb.group({
      arrayNameCtrl: [null, Validators.required],
      arrayObjectsFormArray: this.fb.array([])
    })
  }

  newObject(): FormGroup {
    return this.fb.group({
      objectNameCtrl: [null, Validators.required],
      objectDataTypeCtrl: [null, Validators.required],
    })
  }

  newArrayObject(): FormGroup {
    return this.fb.group({
      objectsCtrl: [null, Validators.required],
      objectDataTypeCtrl: [null, Validators.required],
    })
  }

  newNestedArrayObject(): FormGroup {
    return this.fb.group({
      objectsCtrl: [null, Validators.required],
      objectDataTypeCtrl: [null, Validators.required],
    })
  }

  // Add Remove Functions
  addObject() {
    this.objects().push(this.newObject());
  }

  addArray() {
    this.primaryArrays().push(this.rootLevelArray());
  }

  addNestedArray(index: number) {
    this.nestedArrays(index).push(this.newNestedArray());
  }

  addPrimaryArrayObjects(index: number) {
    this.primaryArrayObjects(index).push(this.newArrayObject());
  }

  addNestedArrayObjects(index: number, secondIndex: number) {
    this.nestedArrayObjects(index, secondIndex).push(this.newNestedArrayObject());
  }

  removeNestedArray(index: number) {
    this.nestedArrays(index).removeAt(index);
  }

  removePrimaryArrayObjects(index: number) {
    this.primaryArrayObjects(index).removeAt(index);
  }

  clearForm() {

  }

  createJson() {

  }

  createItem(inputName: string, inputType: string): FormGroup {
    return this.fb.group({
      name: inputName,
      type: inputType,
    });
  }
}
