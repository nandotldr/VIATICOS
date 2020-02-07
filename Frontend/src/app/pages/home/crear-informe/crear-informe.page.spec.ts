import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearInformePage } from './crear-informe.page';

describe('CrearInformePage', () => {
  let component: CrearInformePage;
  let fixture: ComponentFixture<CrearInformePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInformePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearInformePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
