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
        < div className={scss.search} >
            <div className={scss.filters}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField className={scss.searchText} id="standard-basic" label="Name" value={searchText} onChange={onChangeSearchTextHandler} />
                        <TextField className={scss.select}
                            select
                            title="Type"
                            label="Type"
                            name="Type"
                            value={type}
                            onChange={onChangeTypeHandler}>
                            {props?.pokemonTypes?.map(
                                (item: any, index: number) => (<MenuItem key={index}
                                    value={item}>{item}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>
                </Grid>
            </div>
            <Grid className={scss.buttonContainer} container spacing={1}>
                <Grid item xs={12}>
                    <Button className={scss.button} onClick={() => { props.onSearch(searchText, type) }} variant="contained">Search</Button>
                </Grid>
            </Grid>
        </div >
        // </Grid>
    )
}

export default Search;