import React, { useState } from 'react';
import PokemonList from '../../components/PokemonList/PokemonList';
import { Grid, Container } from '@material-ui/core';
import Search from '../../components/Search/Search';
import { gql, useQuery } from '@apollo/client';
import client from '../../apolloClient/apolloClient';

const Pokemons = () => {

  const [pokemonList, setPokemonList] = useState([]);
  const { loading, error, data } = useQuery(gql`
        query Query {
            pokemonTypes
      }
    `);

  const onSearchHandler = (searchText: string, type: string, after = '', limit = '') => {
    if (!type || type === '') {
      client.query({
        query: gql`
            query Query($pokemonsQ: String) {
                pokemons(q: $pokemonsQ) {
                  edges {
                    cursor
                    node {
                      id
                      name
                      types
                      classification
                    }
                    cursor
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                  }
                }
              }
    `, variables: { pokemonsQ: searchText, pokemonsAfter: after, pokemonsLimit: limit }
      }).then(data => {
        const pokemons = data.data.pokemons.edges.map((pokemon: any) => {
          console.log(pokemon)
          return {
            name: pokemon?.node?.name,
            types: pokemon?.node?.types?.join(),
            classification: pokemon?.node?.classification
          }
        })
        setPokemonList(pokemons);
      });

    } else if ((type && type !== '') && (!searchText || searchText === '')) {
      client.query({
        query: gql`
                query Query($pokemonsByTypeType: String!) {
                    pokemonsByType(type: $pokemonsByTypeType) {
                      pageInfo {
                        endCursor
                        hasNextPage
                      }
                      edges {
                        node {
                          id
                          name
                          classification
                          types
                        }
                        cursor
                      }
                    }
                  }
    `, variables: { pokemonsByTypeType: type, pokemonsAfter: after, pokemonsLimit: limit }
      }).then(data => {
        const pokemons = data.data?.pokemonsByType?.edges?.map((pokemon: any) => {
          return {
            name: pokemon?.node?.name,
            types: pokemon?.node?.types?.join(),
            classification: pokemon?.node?.classification
          }
        })
        setPokemonList(pokemons);
      });

    } else if ((type && type !== '') && (searchText && searchText !== '')) {
      client.query({
        query: gql`
                query Query($pokemonsByNameAndTypeType: String!, $pokemonsByNameAndTypeQ: String) {
                    pokemonsByNameAndType(type: $pokemonsByNameAndTypeType, q: $pokemonsByNameAndTypeQ) {
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
    `, variables: { pokemonsByNameAndTypeQ: searchText, pokemonsByNameAndTypeType: type, pokemonsAfter: after, pokemonsLimit: limit }
      }).then(data => {
        const pokemons = data.data.pokemonsByNameAndType.edges.map((pokemon: any) => {
          console.log(pokemon)
          return {
            name: pokemon?.node?.name,
            types: pokemon?.node?.types?.join(),
            classification: pokemon?.node?.classification
          }
        })

        console.log(pokemons);
        setPokemonList(pokemons);

      });
    }
  }

  return (
    <Container>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Search onSearch={onSearchHandler} pokemonTypes={data?.pokemonTypes} />
        <Grid item xs={12}>
          <PokemonList pokemonList={pokemonList} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Pokemons;
