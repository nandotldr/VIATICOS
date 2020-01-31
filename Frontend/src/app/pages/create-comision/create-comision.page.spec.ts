import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateComisionPage } from './create-comision.page';

describe('CreateComisionPage', () => {
  let component: CreateComisionPage;
  let fixture: ComponentFixture<CreateComisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
