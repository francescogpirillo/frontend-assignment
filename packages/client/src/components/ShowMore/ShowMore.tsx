import React from 'react';
import { Button } from "@material-ui/core";
import scss from './ShowMore.module.scss';
import { ShowMoreProps } from './models/showMoreProps';

const ShowMore = ({ showMoreClicked }: ShowMoreProps) => {
    return (
        <div className={scss.showMore}>
            <Button className={scss.button}
                onClick={() => {
                    showMoreClicked();
                }}
                variant="contained">
                Show More
            </Button>
        </div>
    );
};

export default ShowMore;
