import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import scss from './PokemonList.module.scss';
import { PokemonListProps } from './models/pokemonListProps';
import { Pokemon } from '../../shared/models/Pokemon';
import { Button, Toolbar } from '@material-ui/core';

const PokemonList = ({ pokemonList, fetchAll }: PokemonListProps) => {
    return (
        <div className={scss.pokemonList}>
            <Toolbar className={scss.toolbar}>
                <Button className={scss.fetchAll}
                    onClick={() => {
                        fetchAll();
                    }}
                    variant="contained">
                    Fetch All
            </Button>
            </Toolbar>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead className={scss.tableHead}>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Types</TableCell>
                            <TableCell align="center">Classification</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pokemonList && pokemonList.map((row: Pokemon) => (
                            <TableRow key={row.id}>
                                <TableCell align="center" component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="center">{row.types}</TableCell>
                                <TableCell align="center">{row.classification}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PokemonList;