import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

	form!: FormGroup
	ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl('', [Validators.email, Validators.required, MyValidators.restrictedEmails], MyValidators.uniqEmail),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
			country: new FormControl('ru'),
			city: new FormControl('', Validators.required),
			//address: new FormGroup({})
			skills: new FormArray([])
		});
	}

	submit() {
		const formData = { ...this.form.value };
		console.log('Form: ', this.form);
		console.log('FormData: ', formData);
	}
	setCapital() {
		const cityMap: any = {
			ru: 'Москва',
			ua: 'Киев',
			by: 'Минск'
		};
		const cityKey = this.form.get('country')?.value;

		const city: string = cityMap?.[cityKey];
		console.log(cityKey, city);

		this.form.patchValue({ city })

	}
	addSkill() {
		const control = new FormControl('', Validators.required);
		(<FormArray>this.form.get('skills')).push(control);
		//(this.form.get('skills') as FormArray)
	}
	getControls() {
		return (this.form.get('skills') as FormArray).controls
	}
}
