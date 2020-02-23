import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProyectoActivoPage } from './proyecto-activo.page';

describe('ProyectoActivoPage', () => {
  let component: ProyectoActivoPage;
  let fixture: ComponentFixture<ProyectoActivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoActivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProyectoActivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
