import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RevisarComisionPage } from './revisar-comision.page';

describe('RevisarComisionPage', () => {
  let component: RevisarComisionPage;
  let fixture: ComponentFixture<RevisarComisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarComisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RevisarComisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
