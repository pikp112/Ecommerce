import { AsyncValidatorFn } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { timer } from 'rxjs/internal/observable/timer';
import { map, switchMap } from 'rxjs';

export class EmailValidator {
  constructor(private accountService: AccountService) {}
}

export function ValidateEmailNotToken(): AsyncValidatorFn {
  return (controls) => {
    return timer(500).pipe(
      switchMap(() => {
        if (!controls.value) {
          return null;
        }
        return this.accountService.checkEmailExists(controls.value).pipe(
          map((res) => {
            return res ? { emailExists: true } : null;
          })
        );
      })
    );
  };
}
