import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RevisarViaticoPage } from './revisar-viatico.page';

describe('RevisarViaticoPage', () => {
  let component: RevisarViaticoPage;
  let fixture: ComponentFixture<RevisarViaticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarViaticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RevisarViaticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
