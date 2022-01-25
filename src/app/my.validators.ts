import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

import { Observable } from "rxjs";

export class MyValidators {
	static restrictedEmails(control: FormControl): { [key: string]: boolean } {
		if (['v@mail.ru', 'test@mail.ru', 'async@mail.ru'].includes(control.value)) {
			return { restrictedEmail: true }
		}
		return { restrictedEmail: false }
	}

	static uniqEmail(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
		return new Promise(resolve => {
			setTimeout(() => {
				if (control.value === 'async1@mail.ru') {
					resolve({ uniqEmail: true });
				} else {
					resolve({ uniqEmail: false });
				}
			}, 1000);
		})
	}
}