import React, { useState } from 'react';
import { Grid, MenuItem, TextField, Button } from '@material-ui/core';
import scss from './Search.module.scss';

const Search = (props: any) => {

    const [searchText, setSearchText] = useState('');
    const [type, setType] = useState('');

    const onChangeTypeHandler = (e: any) => {
        setType(e.target.value)
    }

    const onChangeSearchTextHandler = (e: any) => {
        setSearchText(e.target.value)
    }

    return (
        <Grid container direction="row" alignItems="flex-end" justify="center" spacing={3} item >
            <Grid item xs={12} sm={2}>
                <TextField id="standard-basic" label="Name" value={searchText} onChange={onChangeSearchTextHandler} />
            </Grid>
            <Grid item xs={12} sm={2}>

                <TextField className={scss.select}
                    id="standard-select-currency"
                    select
                    title="Type"
                    label="Type"
                    name="Type"
                    value={type}
                    onChange={onChangeTypeHandler}
                    {...props}
                >
                    {props?.pokemonTypes?.map(
                        (item: any, index: number) => (<MenuItem key={index}
                            value={item}>{item}</MenuItem>)
                    )}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Button onClick={() => { props.onSearch(searchText, type) }} color="primary" variant="contained">Search</Button>
            </Grid>
        </Grid>
    )
}

export default Search;