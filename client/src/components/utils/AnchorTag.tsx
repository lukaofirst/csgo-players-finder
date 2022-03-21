import { Link } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    url: string;
}

const AnchorTag = ({ children, url }: Props) => {
    return (
        <Link
            href={url}
            target='_blank'
            rel='noreferrer'
            sx={{ textDecoration: 'none', color: '#299cdd' }}
        >
            {children}
        </Link>
    );
};

export default AnchorTag;
