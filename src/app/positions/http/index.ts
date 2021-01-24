import {PositionApiService} from './position-api.service';
import {CompanyApiService} from './company-api.service';


export const apiServices: any[] = [
  PositionApiService,
  CompanyApiService
];

export * from './position-api.service';
export * from './company-api.service';
