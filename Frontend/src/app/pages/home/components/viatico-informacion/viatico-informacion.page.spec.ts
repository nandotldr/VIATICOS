import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViaticoInformacionPage } from './viatico-informacion.page';

describe('ViaticoInformacionPage', () => {
  let component: ViaticoInformacionPage;
  let fixture: ComponentFixture<ViaticoInformacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViaticoInformacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViaticoInformacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
