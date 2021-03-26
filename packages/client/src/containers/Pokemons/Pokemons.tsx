import React, { useState } from 'react';
import PokemonList from '../../components/PokemonList/PokemonList';
import { Grid, Container, Button } from '@material-ui/core';
import Search from '../../components/Search/Search';
import { gql, useQuery } from '@apollo/client';
import client from '../../apolloClient/apolloClient';

const Pokemons = () => {

  const [pokemonList, setPokemonList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState('');
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState('');


  const { loading, error, data } = useQuery(gql`
        query Query {
            pokemonTypes
      }
    `);

  const onSearchHandler = (searchText: string, type: string, after = '', more = false) => {
    setSearchText(searchText);
    setType(type);
    if (!type || type === '') {
      client.query({
        query: gql`
        query Query($pokemonsQ: String, $pokemonsAfter: ID, $pokemonsLimit: Int) {
          pokemons(q: $pokemonsQ, after: $pokemonsAfter, limit: $pokemonsLimit) {
            edges {
              cursor
              node {
                id
                name
                classification
                types
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
    `, variables: { pokemonsQ: searchText, pokemonsAfter: after }, fetchPolicy: "no-cache"
      }).then(data => {
        const pokemons = data.data.pokemons.edges.map((pokemon: any) => {
          return {
            name: pokemon?.node?.name,
            types: pokemon?.node?.types?.join(),
            classification: pokemon?.node?.classification
          }
        })
        more ? setPokemonList(pokemonList.concat(pokemons)) : setPokemonList(pokemons);
        setHasNextPage(data.data.pokemons.pageInfo.hasNextPage);
        setEndCursor(data.data.pokemons.pageInfo.endCursor);
      });

    } else if ((type && type !== '') && (!searchText || searchText === '')) {
      client.query({
        query: gql`
        query Query($pokemonsByTypeType: String!, $pokemonsByTypeAfter: ID, $pokemonsByTypeLimit: Int) {
          pokemonsByType(type: $pokemonsByTypeType, after: $pokemonsByTypeAfter, limit: $pokemonsByTypeLimit) {
            edges {
              cursor
              node {
                id
                name
                classification
                types
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
    `, variables: { pokemonsByTypeType: type, pokemonsByTypeAfter: after }, fetchPolicy: "no-cache"
      }).then(data => {
        const pokemons = data.data?.pokemonsByType?.edges?.map((pokemon: any) => {
          return {
            name: pokemon?.node?.name,
            types: pokemon?.node?.types?.join(),
            classification: pokemon?.node?.classification
          }
        })
        more ? setPokemonList(pokemonList.concat(pokemons)) : setPokemonList(pokemons);
        setHasNextPage(data.data.pokemonsByType.pageInfo.hasNextPage);
        setEndCursor(data.data.pokemonsByType.pageInfo.endCursor);
      });

    } else if ((type && type !== '') && (searchText && searchText !== '')) {
      client.query({
        query: gql`
        query Query($pokemonsByNameAndTypeType: String!, $pokemonsByNameAndTypeQ: String, $pokemonsByNameAndTypeAfter: ID, $pokemonsByNameAndTypeLimit: Int) {
          pokemonsByNameAndType(type: $pokemonsByNameAndTypeType, q: $pokemonsByNameAndTypeQ, after: $pokemonsByNameAndTypeAfter, limit: $pokemonsByNameAndTypeLimit) {
            edges {
              cursor
              node {
                id
                name
                classification
                types
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
    `, variables: { pokemonsByNameAndTypeQ: searchText, pokemonsByNameAndTypeType: type, pokemonsByNameAndTypeAfter: after }, fetchPolicy: "no-cache"
      }).then(data => {
        const pokemons = data.data.pokemonsByNameAndType.edges.map((pokemon: any) => {
          return {
            name: pokemon?.node?.name,
            types: pokemon?.node?.types?.join(),
            classification: pokemon?.node?.classification
          }
        })
        more ? setPokemonList(pokemonList.concat(pokemons)) : setPokemonList(pokemons);
        setHasNextPage(data.data.pokemonsByNameAndType.pageInfo.hasNextPage);
        setEndCursor(data.data.pokemonsByNameAndType.pageInfo.endCursor);
      });
    }
  }

  return (
    <Container>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Search onSearch={onSearchHandler} pokemonTypes={data?.pokemonTypes} />
        <Grid item xs={12}>
          <PokemonList pokemonList={pokemonList} />
          {hasNextPage ? <Button onClick={() => { onSearchHandler(searchText, type, endCursor, true) }} color="primary" variant="contained">Show more</Button> : <></>}
        </Grid>

      </Grid>
    </Container>
  );
}

export default Pokemons;
