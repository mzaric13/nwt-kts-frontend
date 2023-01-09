import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl } from '@angular/forms';
import { TagDTO } from 'src/app/models/tag-dto';

@Component({
  selector: 'app-ride-options',
  templateUrl: './ride-options.component.html',
  styleUrls: ['./ride-options.component.css'],
})
export class RideOptionsComponent implements OnInit {
  ride = new FormGroup({
    isChecked: new FormControl(false),
    tagControl: new FormControl(),
  });

  @Input() tags: TagDTO[] = [];

  people: string[] = [];
  selectedTags: TagDTO[] = [];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  showTimeInput: boolean = false;

  @ViewChild('rideForm') form!: ElementRef<HTMLInputElement>;

  showDropdownTag: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public addTag(event: MatChipInputEvent): void {
    const value = event.value;
    if ((value || '').trim()) {
      this.selectTagByName(value.trim());
    }
    event.chipInput!.clear();
  }

  removeTag(tag: TagDTO): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  clearInput() {
    this.form.nativeElement.click();
  }

  private selectTagByName(tagName: string) {
    let foundTags = this.tags.filter((tag) => tag.name == tagName);
    if (foundTags.length) {
      this.selectedTags.push(foundTags[0]);
      this.clearInput();
    }
  }

  addPerson(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.people.push(value);
    }
    event.chipInput!.clear();
  }

  removePerson(person: string): void {
    const index = this.people.indexOf(person);
    if (index >= 0) {
      this.people.splice(index, 1);
    }
  }

  changeTimeInputVisibility() {
    this.showTimeInput = this.ride.controls.isChecked.value!;
  }

  openDropdownTag() {
    this.showDropdownTag = true;
  }

  closeDropdownTag() {
    this.showDropdownTag = false;
  }

  getTag() {
    return this.ride.controls.tagControl.value;
  }

  getSelectedTags() {
    return this.selectedTags;
  }

  selectTag(tag: TagDTO) {
    this.ride.patchValue({
      tagControl: tag.name,
    });
  }
}
