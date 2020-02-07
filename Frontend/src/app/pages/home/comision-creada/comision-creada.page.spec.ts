import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComisionCreadaPage } from './comision-creada.page';

describe('ComisionCreadaPage', () => {
  let component: ComisionCreadaPage;
  let fixture: ComponentFixture<ComisionCreadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionCreadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComisionCreadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
