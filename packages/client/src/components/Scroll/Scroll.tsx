import React, { useEffect, useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import scss from './Scroll.module.scss';
import { ScrollProps } from './models/scrollProps';

const Scroll = ({ showBelow }: ScrollProps) => {

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    return (
        <div className={scss.scroll} >
            {show &&
                <IconButton className={scss.button}
                    aria-label="to top" component="span"
                    onClick={() => {
                        handleClick();
                    }}>
                    <ExpandLessIcon />
                </IconButton>
            }
        </div>
    );
};

export default Scroll;
