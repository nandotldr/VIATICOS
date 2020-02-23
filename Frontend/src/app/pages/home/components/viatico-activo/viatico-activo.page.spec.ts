import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViaticoActivoPage } from './viatico-activo.page';

describe('ViaticoActivoPage', () => {
  let component: ViaticoActivoPage;
  let fixture: ComponentFixture<ViaticoActivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViaticoActivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViaticoActivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
