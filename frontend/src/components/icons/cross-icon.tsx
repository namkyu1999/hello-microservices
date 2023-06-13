import SvgIcon from '@mui/material/SvgIcon';
import React from 'react';
import { ReactComponent as CrossIconSvg } from '../../images/icon-cross.svg';

export function CrossIcon() {
    return <SvgIcon component={CrossIconSvg} inheritViewBox />;
}
