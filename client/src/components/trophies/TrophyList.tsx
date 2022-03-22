import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Trophy } from '../../models/Trophy';

interface Props {
    items: Trophy[];
}

const TrophyList = ({ items }: Props) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 5 }}>
            <Table sx={{ minWidth: 600 }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#383838' }}>
                        <TableCell sx={{ color: 'white' }}>Id</TableCell>
                        <TableCell sx={{ color: 'white' }}>Year</TableCell>
                        <TableCell sx={{ color: 'white' }}>
                            Title Name
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>Is Major?</TableCell>
                        <TableCell sx={{ color: 'white' }} align='center'>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow>
                            <TableCell>
                                {item.id.toString().padStart(4, '0')}
                            </TableCell>
                            <TableCell>{item.year}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.isMajor.toString()}</TableCell>
                            <TableCell align='center'>
                                <Button
                                    variant='outlined'
                                    color='error'
                                    size='small'
                                >
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TrophyList;
