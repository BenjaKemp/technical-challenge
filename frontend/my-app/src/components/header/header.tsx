import React from 'react';
import { Props } from './types'

export const Header: React.FC<Props> = ({children}): JSX.Element  =>{

    return (
        <header className="Header">
            {children}
        </header>
    );
}
