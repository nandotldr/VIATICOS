import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailItinerarioPage } from './detail-itinerario.page';

describe('DetailItinerarioPage', () => {
  let component: DetailItinerarioPage;
  let fixture: ComponentFixture<DetailItinerarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItinerarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailItinerarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
