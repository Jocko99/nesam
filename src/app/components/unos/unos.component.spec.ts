import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosComponent } from './unos.component';

describe('UnosComponent', () => {
  let component: UnosComponent;
  let fixture: ComponentFixture<UnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
