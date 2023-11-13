export interface DataObject {
  name: string,
  type: string
}

export interface DataArray {
  name: string,
  dataObjects: DataObject[],
  dataArrays: DataArray[]
}

export interface ParentData {
  dataObjects: DataObject[],
  dataArrays: DataArray[]
}

export interface MatSelectData {
  value: string;
  viewValue: string;
}
