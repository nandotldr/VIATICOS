import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewUserPage } from './new-user.page';

describe('NewUserPage', () => {
  let component: NewUserPage;
  let fixture: ComponentFixture<NewUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
