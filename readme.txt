pokemon.component.html

<div>
  <h2>Ingresa el nombre de tu Pokemon</h2>
  <input type="text" [(ngModel)]="name">
  <button (click)="search()">Buscar</button>
  
  
  <div id="base" *ngIf="pokemon" class="card" style="width: 18rem;">
    <h3>ID: {{pokemon.id}}</h3>
    <img src="{{urlImage}}" class="card-img-top" alt="foto pokemon">
    <div class="card-body">
      <h5 class="card-title text-danger">Nombre: {{ pokemon.name }}</h5>
      <p class="card-text">Este pokemon tiene la siguientes habilidades:</p>
      <ul>
        <li *ngFor="let ability of pokemon.abilities">{{ ability.ability.name }}</li>
      </ul>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Base experiencia: {{pokemon.base_experience}}</li>
      <li class="list-group-item">Ataque: {{pokemon.stats[1].base_stat}} K</li>
      <li class="list-group-item">Defensa: {{pokemon.stats[2].base_stat}} K</li>
      <li class="list-group-item">Especial: {{pokemon.stats[3].base_stat}} K</li>
    </ul>
  </div>
  
</div>

--------------------------------------------------------------------------------------------------

css

#base{
    background-color: beige;
    border: 3px solid black;
}

-----------------------------------------------------------------------------------------------------

pokemon.component

import { Component, OnInit } from '@angular/core';
import {  PokemonService } from '../services/pokemon.service'; 

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit  {

  name: string = "";
  pokemon?: any;
  urlImage: any;


  constructor( private PokemonService : PokemonService) { }

  ngOnInit(): void { 
  }

  search(){
    this.PokemonService.getPokemon(this.name).subscribe((data:any) => {
    this.pokemon = data;
    this.urlImage = data.sprites.other.dream_world.front_default;
    console.log(data)
    })
  }

------------------------------------------------------------------------------------------------

index

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Pokemon</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
</head>
<body>
  <app-root></app-root>
</body>
</html>

------------------------------------------------------------------------------------------------------------------------

app.Module

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

-----------------------------------------------------------------------------------------------------

pokemon.services

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private url = "https://pokeapi.co/api/v2"

  constructor(private http: HttpClient) { }

    getPokemon(name: string){
    return this.http.get(`${this.url}/pokemon/${name}`)

  } 

  -----------------------------------------------------------------------------------------------------


