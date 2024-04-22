import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBVarComponent } from './footer-b-var.component';

describe('FooterBVarComponent', () => {
  let component: FooterBVarComponent;
  let fixture: ComponentFixture<FooterBVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterBVarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterBVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
