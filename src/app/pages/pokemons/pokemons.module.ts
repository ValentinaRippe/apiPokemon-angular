import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PokemonsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,

  ]
})
export class PokemonsModule { }
