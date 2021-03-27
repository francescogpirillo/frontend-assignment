import React from 'react';
import { Button } from "@material-ui/core";
import scss from './ShowMore.module.scss';

const ShowMore = ({ showMoreClicked }: any) => {
    return (
        <div className={scss.showMore}>
            <Button
                onClick={() => {
                    showMoreClicked();
                }}
                color="primary"
                variant="contained">
                Show More
            </Button>
        </div>
    );
};

export default ShowMore;
