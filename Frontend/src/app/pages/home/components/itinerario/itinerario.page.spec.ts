import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItinerarioPage } from './itinerario.page';

describe('ItinerarioPage', () => {
  let component: ItinerarioPage;
  let fixture: ComponentFixture<ItinerarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItinerarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
