import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanssPage } from './scanss.page';

describe('ScanssPage', () => {
  let component: ScanssPage;
  let fixture: ComponentFixture<ScanssPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScanssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
