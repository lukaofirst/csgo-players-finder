import { Typography } from '@mui/material';
import { Fragment } from 'react';
import AnchorTag from '../shared/AnchorTag';

const externalLinks = [
    {
        id: 1,
        url: 'https://hltv.org',
        name: 'HLTV.org',
    },
    {
        id: 2,
        url: 'https://liquipedia.net/counterstrike/Main_Page',
        name: 'Liquipedia.net',
    },
];

const ExternalSources = () => {
    return (
        <>
            <Typography variant='subtitle1' textAlign='center' mt={2}>
                All the info was extracted from{' '}
                {externalLinks.map((link) => (
                    <Fragment key={link.id}>
                        <AnchorTag url={link.url} name={link.name} />{' '}
                    </Fragment>
                ))}
            </Typography>
        </>
    );
};

export default ExternalSources;
