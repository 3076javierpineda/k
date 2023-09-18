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

}

