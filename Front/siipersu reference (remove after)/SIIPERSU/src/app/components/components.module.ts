import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {PopConfirmationComponent} from './pop-confirmation/pop-confirmation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PopNewComponent} from './dashboard/pop-new/pop-new.component';
import {PersonalDataComponent} from './profile/personal-data/personal-data.component';
import {LaboralDataComponent} from './profile/laboral-data/laboral-data.component';
import {ExpedientComponent} from './profile/expedient/expedient.component';
import {AcademicDataComponent} from './profile/academic-data/academic-data.component';
import {SkillsComponent} from './profile/skills/skills.component';
import {JobPositionsComponent} from './curriculum/job-positions/job-positions.component';
import {AcademicSubjectComponent} from './curriculum/academic-subject/academic-subject.component';
import {ProfessionalExperiencesComponent} from './curriculum/professional-experiences/professional-experiences.component';
import {ProductsComponent} from './curriculum/products/products.component';
import {FilesComponent} from './curriculum/files/files.component';
import {AssociationsComponent} from './curriculum/associations/associations.component';
import {AwardsComponent} from './curriculum/awards/awards.component';
import {AchievementsComponent} from './curriculum/achievements/achievements.component';
import {ExpedientsComponent} from './expedient/expedients/expedients.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CreateComponent} from './administration/create/create.component';
import {DeleteComponent} from './administration/delete/delete.component';
import {ReportComponent} from './plan-and-reports/report/report.component';
import {LaboralDataContractComponent} from './profile/laboral-data-contract/laboral-data-contract.component';
import {AnnualWorkPlansComponent} from './department/annual-work-plans/annual-work-plans.component';
import {StaffWorkPlansComponent} from './department/annual-work-plans/staff-work-plans/staff-work-plans.component';
import {CollegesAndAcademiesComponent} from './department/colleges-and-academies/colleges-and-academies.component';
import {CollegeComponent} from './department/colleges-and-academies/college/college.component';
import {AcademyComponent} from './department/colleges-and-academies/academy/academy.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PopConfirmationComponent,
    PopNewComponent,
    PersonalDataComponent,
    LaboralDataComponent,
    AcademicDataComponent,
    SkillsComponent,
    JobPositionsComponent,
    AcademicSubjectComponent,
    ProfessionalExperiencesComponent,
    ProductsComponent,
    FilesComponent,
    AssociationsComponent,
    AwardsComponent,
    AchievementsComponent,
    ExpedientsComponent,
    ExpedientComponent,
    CreateComponent,
    DeleteComponent,
    ReportComponent,
    LaboralDataContractComponent,
    AnnualWorkPlansComponent,
    StaffWorkPlansComponent,
    CollegesAndAcademiesComponent,
    CollegeComponent,
    AcademyComponent
  ],
  exports: [
    HeaderComponent,
    PopConfirmationComponent,
    PopNewComponent,
    PersonalDataComponent,
    LaboralDataComponent,
    AcademicDataComponent,
    SkillsComponent,
    JobPositionsComponent,
    AcademicSubjectComponent,
    ProfessionalExperiencesComponent,
    ProductsComponent,
    FilesComponent,
    AssociationsComponent,
    AwardsComponent,
    AchievementsComponent,
    ExpedientsComponent,
    ExpedientComponent,
    CreateComponent,
    DeleteComponent,
    ReportComponent,
    LaboralDataContractComponent,
    AnnualWorkPlansComponent,
    StaffWorkPlansComponent,
    CollegesAndAcademiesComponent,
    CollegeComponent,
    AcademyComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ],
})
export class ComponentsModule {
}
