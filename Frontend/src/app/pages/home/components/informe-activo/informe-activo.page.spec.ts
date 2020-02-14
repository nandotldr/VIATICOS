import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformeActivoPage } from './informe-activo.page';

describe('InformeActivoPage', () => {
  let component: InformeActivoPage;
  let fixture: ComponentFixture<InformeActivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeActivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformeActivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
