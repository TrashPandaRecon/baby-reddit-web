import React from 'react'
import {Container} from './Container';
import {DarkModeSwitch} from './DarkModeSwitch';
import {NavBar} from './NavBar';

interface BasicTemplateProps {

}

export const BasicTemplate: React.FC<BasicTemplateProps> = ({children}) => {
        return (<Container><NavBar></NavBar>{children}</Container>);
}