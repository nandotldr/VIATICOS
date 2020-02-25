import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViaticoPage } from './viatico.page';

describe('ViaticoPage', () => {
  let component: ViaticoPage;
  let fixture: ComponentFixture<ViaticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViaticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViaticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
