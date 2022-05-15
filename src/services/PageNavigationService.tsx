import Button from '@mui/material/Button';
import * as React from 'react'
import {Link} from "react-router-dom";


const linkstyle = {
    "margin": 10,
}

interface LinkDetails {
    path: string,
    text: string,
    handleClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export const NavigationLink = (props: LinkDetails) => {
    const event = props.handleClick
    if(event) {
        return (
            <Link to={props.path} onClick={(e) => event(e)}>
                 <Button variant="contained" style={linkstyle}>{props.text}</Button>{' '}
            </Link> 
        );   
    } else {
        return (
            <Link to={props.path}>
                 <Button variant="contained" style={linkstyle}>{props.text}</Button>{' '}
            </Link> 
        ); 
    }
};