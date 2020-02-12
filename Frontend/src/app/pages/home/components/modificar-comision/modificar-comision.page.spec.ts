import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarComisionPage } from './modificar-comision.page';

describe('ModificarComisionPage', () => {
  let component: ModificarComisionPage;
  let fixture: ComponentFixture<ModificarComisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarComisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarComisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
