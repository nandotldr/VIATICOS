import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RevisarInformePage } from './revisar-informe.page';

describe('RevisarInformePage', () => {
  let component: RevisarInformePage;
  let fixture: ComponentFixture<RevisarInformePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarInformePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RevisarInformePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
