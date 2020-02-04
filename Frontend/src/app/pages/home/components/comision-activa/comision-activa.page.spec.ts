import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComisionActivaPage } from './comision-activa.page';

describe('ComisionActivaPage', () => {
  let component: ComisionActivaPage;
  let fixture: ComponentFixture<ComisionActivaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionActivaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComisionActivaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
