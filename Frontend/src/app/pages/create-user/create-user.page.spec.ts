import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateUserPage } from './create-user.page';

describe('CreateUserPage', () => {
  let component: CreateUserPage;
  let fixture: ComponentFixture<CreateUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
