import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TagDTO } from 'src/app/models/tag-dto';
import { TypeDTO } from 'src/app/models/type-dto';
import { RouteDTO } from 'src/app/models/route-dto';
import Swal from 'sweetalert2';
import { PassengerDTO } from 'src/app/models/passenger-dto';

@Component({
  selector: 'app-ride-options',
  templateUrl: './ride-options.component.html',
  styleUrls: ['./ride-options.component.css'],
})
export class RideOptionsComponent implements OnInit {
  ride = new FormGroup({
    vehicleType: new FormControl<TypeDTO | null>(null, Validators.required),
    isChecked: new FormControl(false),
    tagControl: new FormControl(),
    time: new FormControl(""),
  });

  @Input() route!: RouteDTO;
  @Input() tags: TagDTO[] = [];
  @Input() vehicleTypes: TypeDTO[] = [];
  @Input() loggedPassenger!: PassengerDTO;

  people: string[] = [];
  selectedTags: TagDTO[] = [];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  showTimeInput: boolean = false;

  @ViewChild('rideForm') form!: ElementRef<HTMLInputElement>;

  showDropdownTag: boolean = false;

  @Output() createRideEvent = new EventEmitter();

  currentTime: Date = new Date();

  constructor() {}

  ngOnInit(): void { }
  
  public onSubmit() {
    const time = new Date();
    if (this.ride.controls.time.value) {
      const hour = Number.parseInt(this.ride.controls.time.value.split(':')[0]);
      const minute = Number.parseInt(this.ride.controls.time.value.split(':')[1]);
      time.setHours(hour);
      time.setMinutes(minute);

      const timeNow = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();
      const timeForRide = time.getHours() * 60 + time.getMinutes();
      const timeDifference = timeForRide - timeNow;
      if (timeDifference < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Cannot order drive for the past!',
          timer: 4000,
        });
        return;
      } else if (timeDifference > 300) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Cannot order drive for the time that is more than 5 hours away!',
          timer: 4000,
        });
        return;
      }
    }

    this.createRideEvent.emit({
      passengers: this.people,
      tags: this.selectedTags,
      time,
      typeDTO: this.ride.controls.vehicleType.value,
    })
  }

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
      if (this.loggedPassenger.email === value) {
        Swal.fire({
          icon: 'error',
          title: 'Cannot add yourself',
          text: "You cant add yourself to the list of additional passengers!",
          timer: 4000,
        });
      }
      else if (this.people.length !== 4) this.people.push(value);
      else {
        Swal.fire({
          icon: 'error',
          title: 'Too many passengers!',
          text: "You cant add more than 4 passengers!",
          timer: 4000,
        });
      }
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
