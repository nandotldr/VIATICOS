import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearGastoPage } from './crear-gasto.page';

describe('CrearGastoPage', () => {
  let component: CrearGastoPage;
  let fixture: ComponentFixture<CrearGastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearGastoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearGastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
