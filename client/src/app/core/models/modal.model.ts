export enum ModalEmployeeTitle {
  EditEmployeeTitle = 'Edit Employee',
  CreateEmployeeTitle = 'Create Employee',
  ViewCurrentUserProfileTitle = 'My Profile',
}

export enum ModalEmployeeModeEnum {
  Edit,
  View,
  Create,
}

export interface ModalConfigModel {
  title: ModalEmployeeTitle;
  mode: ModalEmployeeModeEnum;
  initialData?: any; // Additional data for the modal
  closeButtonLabel?: string; // Optional label for the close button
  saveButtonLabel?: string;
}
