import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailFacturaPage } from './detail-factura.page';

describe('DetailFacturaPage', () => {
  let component: DetailFacturaPage;
  let fixture: ComponentFixture<DetailFacturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFacturaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailFacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
