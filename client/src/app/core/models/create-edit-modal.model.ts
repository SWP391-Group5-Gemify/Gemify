export interface CreateEditModal {
  mode: string;
  title: CreateEditModalEmployeeTitleEnum;
  data: any;
}

export enum CreateEditModalEmployeeTitleEnum {
  editTitle = 'Edit Employee',
  createTitle = 'Create Employee',
}

export enum CreateEditModalModeEnum {
  updateData,
  createData,
}
