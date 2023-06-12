import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as CrossIconSvg } from '../../images/icon-cross.svg';

export const CrossIcon = () => {
    return <SvgIcon component={CrossIconSvg} inheritViewBox />;
};
