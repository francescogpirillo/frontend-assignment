import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const PokemonList = (props: any) => {
    console.log(props.pokemonList)
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Types</TableCell>
                        <TableCell align="center">Classification</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.pokemonList && props.pokemonList.map((row: any) => (
                        <TableRow key={row.name}>
                            <TableCell align="center" component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.types}</TableCell>
                            <TableCell align="center">{row.classification}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PokemonList;