import {Container} from 'next/app';
import React from 'react'
import {NavBar} from './NavBar';

interface BasicTemplateProps {

}

export const BasicTemplate: React.FC<BasicTemplateProps> = ({children}) => {
        return (<Container><NavBar></NavBar>{children}</Container>);
}