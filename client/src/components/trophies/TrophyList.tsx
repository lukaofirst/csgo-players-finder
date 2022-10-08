import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Trophy } from '../../models/Trophy';
import TrophyItem from './TrophyItem';

interface ITrophyList {
    items: Trophy[];
}

const TrophyList = ({ items }: ITrophyList) => {
    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 5 }}>
                <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#383838' }}>
                            <TableCell sx={{ color: 'white' }}>Id</TableCell>
                            <TableCell sx={{ color: 'white' }}>Year</TableCell>
                            <TableCell width={500} sx={{ color: 'white' }}>
                                Title Name
                            </TableCell>
                            <TableCell width={100} sx={{ color: 'white' }}>
                                Is Major?
                            </TableCell>
                            <TableCell sx={{ color: 'white' }} align='center'>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TrophyItem key={item.id} item={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TrophyList;
