import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm<A>(initialFValues: A, validateOnChange: boolean = false, validate: (fieldValues?: any) => boolean) {

    const [values, setValues] = useState<A>(initialFValues);
    const [errors, setErrors] = useState<Partial<A>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });
        if (validateOnChange)
            validate({ [name]: value })
    }


    const resetForm = () => {
        setValues(initialFValues);
        setErrors({});
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
            textAlign: 'left'
        }
    }
}))

export function Form({ children, ...other }: any) {

    const classes = useStyles();
    return (
        <form className={classes.root} {...other}>
            {children}
        </form>
    )
}