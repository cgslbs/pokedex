export interface PokemonType {
    id:                    number;
    name:                  string;
    damage_relations:      DamageRelations;
    past_damage_relations: PastDamageRelation[];
    game_indices:          GameIndex[];
    generation:            Generation;
    move_damage_class:     Generation;
    names:                 Name[];
    pokemon:               Pokemon[];
    moves:                 Generation[];
}

export interface DamageRelations {
    no_damage_to:       Generation[];
    half_damage_to:     Generation[];
    double_damage_to:   Generation[];
    no_damage_from:     Generation[];
    half_damage_from:   Generation[];
    double_damage_from: Generation[];
}

export interface Generation {
    name: string;
    url:  string;
}

export interface GameIndex {
    game_index: number;
    generation: Generation;
}

export interface Name {
    name:     string;
    language: Generation;
}

export interface PastDamageRelation {
    generation:       Generation;
    damage_relations: DamageRelations;
}

export interface Pokemon {
    slot:    number;
    pokemon: Generation;
}
