import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacturaPage } from './factura.page';

describe('FacturaPage', () => {
  let component: FacturaPage;
  let fixture: ComponentFixture<FacturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
