import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RevisarProyectoPage } from './revisar-proyecto.page';

describe('RevisarProyectoPage', () => {
  let component: RevisarProyectoPage;
  let fixture: ComponentFixture<RevisarProyectoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarProyectoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RevisarProyectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
