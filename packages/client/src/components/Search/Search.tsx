import React from 'react';
import { Grid, MenuItem, TextField, Button } from '@material-ui/core';
import scss from './Search.module.scss';
import { SearchProps } from './models/searchProps';
import { Form, useForm } from '../../hooks/useForm'
import { SearchValues } from './models/initialSearchValues';

const Search = ({ pokemonTypes, onSearch }: SearchProps) => {

    const initialSearchValues: SearchValues = {
        name: '',
        type: ''
    }

    const validate: (fieldValues?: SearchValues) => boolean = (fieldValues = values) => {
        let temp: Partial<SearchValues> = { ...errors }
        if ('name' in fieldValues && 'type' in fieldValues) {
            const error: string = fieldValues.name === "" && fieldValues.type === "" ? "Insert at least one filter" : "";
            temp.name = error;
            temp.type = error;
        }
        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
        return true;
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
    } = useForm<SearchValues>(initialSearchValues, true, validate);


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validate()) {
            onSearch(values.name, values.type);
        }
    }

    return (
        <div className={scss.search} >
            <Form onSubmit={handleSubmit}>
                <Grid className={scss.filters} container>
                    <Grid item xs={12}>
                        <TextField className={scss.name}
                            id="standard-basic"
                            name="name" label="Name"
                            value={values.name}
                            onChange={handleInputChange}
                            {...(errors.name && { error: true, helperText: errors.name })}
                        />
                        <TextField className={scss.select}
                            select
                            title="Type"
                            label="Type"
                            name="type"
                            value={values.type}
                            onChange={handleInputChange}
                            {...(errors.type && { error: true, helperText: errors.type })}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {pokemonTypes?.map(
                                (item: string, index: number) => (<MenuItem key={index}
                                    value={item}>{item}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid className={scss.buttonContainer} container spacing={1}>
                    <Grid item xs={12}>
                        <Button className={scss.button} type="submit" variant="contained">Search</Button>
                    </Grid>
                </Grid>
            </Form>
        </div >
        // </Grid>
    )
}

export default Search;