import { Link } from '@mui/material';
import { ReactNode } from 'react';

interface IAnchorTag {
    url: string;
    name?: string;
    children?: ReactNode;
}

const AnchorTag = ({ url, name, children }: IAnchorTag) => {
    return (
        <Link
            href={url}
            target='_blank'
            rel='noreferrer'
            sx={{ textDecoration: 'none', color: '#299cdd' }}
        >
            {name}
            {children}
        </Link>
    );
};

export default AnchorTag;
