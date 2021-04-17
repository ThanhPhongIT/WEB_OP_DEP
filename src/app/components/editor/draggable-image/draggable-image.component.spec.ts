import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableImageComponent } from './draggable-image.component';

describe('DraggableImageComponent', () => {
  let component: DraggableImageComponent;
  let fixture: ComponentFixture<DraggableImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggableImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
