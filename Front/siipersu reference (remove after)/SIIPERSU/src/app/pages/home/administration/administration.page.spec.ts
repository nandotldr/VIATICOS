import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministrationPage } from './administration.page';

describe('AdministrationPage', () => {
  let component: AdministrationPage;
  let fixture: ComponentFixture<AdministrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
