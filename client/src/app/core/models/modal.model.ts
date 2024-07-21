export enum ModalTitle {
  EditEmployeeTitle = 'Edit Employee',
  CreateEmployeeTitle = 'Create Employee',
  ViewCurrentUserProfileTitle = 'My Profile',
  CreatePromotionTitle = 'Create Promotion',
}

export enum ModalModeEnum {
  Edit,
  View,
  Create,
}

export interface ModalConfigModel {
  title: ModalTitle;
  mode: ModalModeEnum;
  initialData?: any; // Additional data for the modal
  closeButtonLabel?: string; // Optional label for the close button
  saveButtonLabel?: string;
}
