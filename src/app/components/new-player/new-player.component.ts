import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { createPlayer, startConnection } from 'src/app/store/actions/senw.actions';
import { CreatePlayerModel } from 'src/app/store/services/signal-r.models';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {
  sliderValue: number = 0;

  latitude: number = 0;
  longitude: number = 0;

  onSliderChange(event: any) {
    this.sliderValue = Number(event.target.value);
  }

  newPlayerForm: FormGroup;
  
  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.newPlayerForm = this.formBuilder.group({
      newPlayerName: ['', Validators.required]
    });
  }
    
  ngOnInit(): void {
    this.store.dispatch(startConnection());
  }

  getLongAndLat() {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }

  async getLocation() {
    try {
        const position = await this.getLongAndLat() as GeolocationPosition;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.createNewPlayer();
        console.log(this.longitude, this.latitude);
        } 
    catch (error) {
          console.log(error);
        }
  }

  createNewPlayer() {
    if (this.newPlayerForm.valid) {

      const player: CreatePlayerModel = {
        playerName: this.newPlayerForm.value.newPlayerName,
        locationX: this.latitude,
        locationY: this.longitude, 
      };
      this.store.dispatch(createPlayer(player));
    }
  }
}