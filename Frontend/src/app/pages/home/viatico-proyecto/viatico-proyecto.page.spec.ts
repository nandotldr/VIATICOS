import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViaticoProyectoPage } from './viatico-proyecto.page';

describe('ViaticoProyectoPage', () => {
  let component: ViaticoProyectoPage;
  let fixture: ComponentFixture<ViaticoProyectoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViaticoProyectoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViaticoProyectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
