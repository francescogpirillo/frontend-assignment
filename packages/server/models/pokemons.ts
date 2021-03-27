import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection } from "../types";

interface Pokemon {
  id: string;
  name: string;
  types: string[];
}

const SIZE = 10;

export function query(args: {
  after?: string;
  limit?: number;
  q?: string;
}): Connection<Pokemon> {
  const { after, q, limit = SIZE } = args;

  const filterByQ: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    q === undefined
      ? identity
      : A.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    after === undefined
      ? identity
      : as =>
        pipe(
          as,
          A.findIndex(a => a.id === after),
          O.map(a => a + 1),
          O.fold(() => as, idx => as.slice(idx))
        );

  const results: Pokemon[] = pipe(
    data,
    filterByQ,
    sliceByAfter,
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}


export function queryPokemonsByType(args: {
  after?: string;
  limit?: number;
  type?: string;
}): Connection<Pokemon> {

  const { after, type, limit = SIZE } = args;

  const filterByType: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    type === undefined
      ? identity
      : A.filter(p => p.types.includes(type));

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    after === undefined
      ? identity
      : as =>
        pipe(
          as,
          A.findIndex(a => a.id === after),
          O.map(a => a + 1),
          O.fold(() => as, idx => as.slice(idx))
        );

  const results: Pokemon[] = pipe(
    data,
    filterByType,
    sliceByAfter,
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}

export function queryPokemonsByFilters(args: {
  q?: string;
  type?: string;
  after?: string;
  limit?: number;
}): Connection<Pokemon> {

  const { after, type, q, limit = SIZE } = args;

  const filterByQ: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    q === undefined
      ? identity
      : A.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  const filterByType: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    type === undefined
      ? identity
      : A.filter(p => p.types.includes(type));

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    after === undefined
      ? identity
      : as =>
        pipe(
          as,
          A.findIndex(a => a.id === after),
          O.map(a => a + 1),
          O.fold(() => as, idx => as.slice(idx))
        );

  const results: Pokemon[] = pipe(
    data,
    filterByQ,
    filterByType,
    sliceByAfter,
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}

export function pokemonTypes(): string[] {
  let types = new Set<string>();

  data.forEach(pokemon => {
    pokemon.types.forEach(type => {
      if (!types.has(type)) types.add(type);
    });
  })

  return Array.from(types.values());
}




