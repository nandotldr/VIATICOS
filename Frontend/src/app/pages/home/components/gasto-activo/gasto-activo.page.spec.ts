import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GastoActivoPage } from './gasto-activo.page';

describe('GastoActivoPage', () => {
  let component: GastoActivoPage;
  let fixture: ComponentFixture<GastoActivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoActivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GastoActivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
