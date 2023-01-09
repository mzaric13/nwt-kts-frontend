import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl } from '@angular/forms';
import { TagDTO } from 'src/app/models/tag-dto';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-ride-options',
  templateUrl: './ride-options.component.html',
  styleUrls: ['./ride-options.component.css'],
})
export class RideOptionsComponent implements OnInit, OnChanges {
  ride = new FormGroup({
    isChecked: new FormControl(false),
    tagControl: new FormControl(),
  });

  @Input() tags: TagDTO[] = [];

  people: string[] = [];
  selectedTags: TagDTO[] = [];
  filteredTags!: Observable<String[]>;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  showTimeInput: boolean = false;

  @ViewChild('tagInput') tagsInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const tagsChange = changes['tags'];
    if (tagsChange) {
      const currentTags = tagsChange.currentValue;
      if (currentTags.length > 0) {
        this.filteredTags = this.ride.controls.tagControl.valueChanges.pipe(
          startWith(null),
          map((tagName) => this.filterOnValueChange(tagName))
        );
      }
    }
  }

  ngOnInit(): void {}

  filterOnValueChange(tagName: string | null): String[] {
    let result: String[] = [];
    const tagsNotSelected = this.tags.filter(
      (tag) => this.selectedTags.indexOf(tag) < 0
    );
    if (tagName) {
      result = this.filterTag(tagsNotSelected, tagName);
    } else {
      result = tagsNotSelected.map((tag) => tag.name);
    }
    return result;
  }

  private filterTag(tagList: TagDTO[], tagName: String): String[] {
    let filteredTagList: TagDTO[] = [];
    const filterValue = tagName.toLowerCase();
    let tagsMatchingTagName = tagList.filter(
      (tag) => tag.name.toLowerCase().indexOf(filterValue) === 0
    );
    if (tagsMatchingTagName.length) {
      filteredTagList = tagsMatchingTagName;
    } else {
      filteredTagList = tagList;
    }
    return filteredTagList.map((tag) => tag.name);
  }

  public addTag(event: MatChipInputEvent): void {
    //
    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    //
    if (this.matAutocomplete.isOpen) {
      return;
    }
    const value = event.value;
    if ((value || '').trim()) {
      this.selectTagByName(value.trim());
    }

    this.resetInputs();
  }

  removeTag(tag: TagDTO): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.resetInputs();
    }
  }

  public tagSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectTagByName(event.option.value);
    this.resetInputs();
  }

  private resetInputs() {
    this.tagsInput.nativeElement.value = '';
    this.ride.controls.tagControl.setValue(null);
  }

  private selectTagByName(tagName: string) {
    let foundTags = this.tags.filter((tag) => tag.name == tagName);
    if (foundTags.length) {
      this.selectedTags.push(foundTags[0]);
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
}
