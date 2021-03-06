import {StudentPositionsComponent} from './student-positions/student-positions.component';
import {CompanyPositionsComponent} from './company-positions/company-positions.component';
import {EditPositionComponent} from './edit-position/edit-position.component';
import {AddPositionComponent} from './add-position/add-position.component';
import {AdminPositionsComponent} from './admin-positions/admin-positions.component';

export const components: any[] = [
  AdminPositionsComponent,
  StudentPositionsComponent,
  CompanyPositionsComponent,
  EditPositionComponent,
  AddPositionComponent
];

export * from './admin-positions/admin-positions.component';
export * from './student-positions/student-positions.component';
export * from './company-positions/company-positions.component';
export * from './edit-position/edit-position.component';
export * from './add-position/add-position.component';
