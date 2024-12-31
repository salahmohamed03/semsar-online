import { Result } from './../Interfaces/result';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { CompanyService } from '../Services/company.service';
import { firstValueFrom } from 'rxjs';


export const  companyGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const companyService = inject(CompanyService);
  const router = inject(Router);

  return firstValueFrom(companyService.getMyCompany()).then((company) => {
    if (company) {
      router.navigate(["/company"]);
      return false;
    }

    return true;
  })
  .catch((error) => {
    console.log("error getting company:",error);
    if(!auth.isAuthenticated()){
      router.navigate(['/login']);
    }
    return false;
  });
};

