export class ValidationService {
  static emailValidator(control: any) {
    if (control.value.match(/[a-z0-9._%+-]+@+usco.edu.co/)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
  static passwordValidator(control) {
    if (control.value.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,32}')) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
}
