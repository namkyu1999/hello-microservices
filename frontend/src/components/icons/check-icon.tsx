import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as CheckIconSvg } from '../../images/icon-check.svg';

export const CheckIcon = () => {
    return (
        <SvgIcon
            sx={{
                borderRadius: '90px',
                mx: 1,
                background:
                    'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
                '& path': {
                    transform: 'translate(7px, 8px)',
                },
            }}
            component={CheckIconSvg}
            inheritViewBox
        />
    );
};
