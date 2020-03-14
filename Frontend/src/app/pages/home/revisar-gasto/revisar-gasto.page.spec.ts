import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RevisarGastoPage } from './revisar-gasto.page';

describe('RevisarGastoPage', () => {
  let component: RevisarGastoPage;
  let fixture: ComponentFixture<RevisarGastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarGastoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RevisarGastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
