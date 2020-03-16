import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailAgendaPage } from './detail-agenda.page';

describe('DetailAgendaPage', () => {
  let component: DetailAgendaPage;
  let fixture: ComponentFixture<DetailAgendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAgendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailAgendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
