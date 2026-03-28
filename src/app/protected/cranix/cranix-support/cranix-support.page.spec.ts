import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CranixSupportPage } from './cranix-support.page';

describe('CranixSupportPage', () => {
  let component: CranixSupportPage;
  let fixture: ComponentFixture<CranixSupportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CranixSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
