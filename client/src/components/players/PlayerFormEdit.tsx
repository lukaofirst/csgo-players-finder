import { LoadingButton } from '@mui/lab';
import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { StatusCode } from '../../models/Enums/StatusCode';
import { Player } from '../../models/Player';
import {
    editPlayerAsync,
    fetchPlayerAsync,
} from '../../store/asyncThunks/playerAsyncThunk';
import { fetchTeamsAsync } from '../../store/asyncThunks/teamAsyncThunks';
import { fetchTrophiesAsync } from '../../store/asyncThunks/trophyAsyncThunks';
import BackButton from '../shared/BackButton';
import LoadingComponent from '../shared/LoadingComponent';

const customCheckboxStyle = {
    width: '1rem',
    height: '1rem',
    marginRight: '0.5rem',
};

const customCheckboxDivStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0.25rem',
};

const PlayerFormEdit = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const { player, status } = useAppSelector((state) => state.players);
    const { teamsList, teamsLoaded } = useAppSelector((state) => state.teams);
    const { trophiesList, trophiesLoaded } = useAppSelector(
        (state) => state.trophies
    );

    const [showSelectList, setShowSelectList] = useState('true');
    const [userInput, setUserInput] = useState<Player>({
        id: '',
        nickname: '',
        name: '',
        age: 0,
        nationality: '',
        isActive: false,
        teamId: '',
        team: null,
        trophyIds: [],
        trophies: [],
    });
    const [filteredTrophiesList, setFilteredTrophiesList] = useState<any[]>([]);

    useEffect(() => {
        dispatch(fetchTeamsAsync());
        dispatch(fetchTrophiesAsync());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchPlayerAsync(id!));
    }, [dispatch, id]);

    useEffect(() => {
        setFilteredTrophiesList(player.trophyIds);

        setUserInput({
            id: player?.id,
            nickname: player?.nickname!,
            name: player?.name!,
            age: player?.age!,
            nationality: player?.nationality!,
            isActive: player?.isActive!,
            teamId: player?.teamId,
            team: player?.team!,
            trophyIds: player?.trophyIds!,
            trophies: player?.trophies,
        });
    }, [
        player?.age,
        player?.id,
        player?.isActive,
        player?.name,
        player?.nationality,
        player?.nickname,
        player?.teamId,
        player?.team,
        player?.trophyIds,
        player?.trophies,
    ]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setShowSelectList(e.target.value);
    };

    const enteredData = (e: any) => {
        setUserInput((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const handleCheck = (id: any) => {
        if (player && trophiesList) {
            if (filteredTrophiesList.includes(id)) {
                const newArrWithRemovedTrophy = filteredTrophiesList.filter(
                    (item) => item !== id
                );

                setFilteredTrophiesList(newArrWithRemovedTrophy);
            } else {
                const newArrWithAddedTrophy = [...filteredTrophiesList, id];

                setFilteredTrophiesList(newArrWithAddedTrophy);
            }
        }
    };

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        const player: Player = {
            id: userInput.id,
            nickname: userInput.nickname,
            name: userInput.name,
            age: userInput.age,
            nationality: userInput.nationality,
            isActive: userInput.isActive,
            team: userInput.team,
            trophyIds: filteredTrophiesList,
            ...(userInput.isActive && {
                teamId: userInput.teamId!,
            }),
        };

        try {
            const result = await dispatch(editPlayerAsync(player)).unwrap();

            if (result.statusCode === StatusCode.Success) {
                setUserInput({
                    id: '',
                    nickname: '',
                    name: '',
                    age: 0,
                    nationality: '',
                    isActive: false,
                    teamId: '',
                    team: null,
                    trophyIds: [],
                    trophies: [],
                });

                navigate(`/players/${id}`);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!teamsLoaded && !trophiesLoaded && userInput.trophyIds!.length > 0)
        return <LoadingComponent message='Loading all the info needed...' />;

    return (
        <Container maxWidth='lg' sx={{ mt: 2 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackButton />
            </Stack>
            <Box
                sx={{
                    mt: 2,
                    mb: 5,
                    display: 'block',
                    textAlign: 'center',
                }}
            >
                <Typography variant='h5' sx={{ mb: 1, color: '#299cdd' }}>
                    Edit a player
                </Typography>
                <FormControl
                    component='form'
                    onSubmit={onSubmitHandler}
                    sx={{
                        width: '100%',
                        maxWidth: '500px',
                        marginBottom: '20px',
                    }}
                >
                    <TextField
                        label='Id'
                        name='id'
                        variant='outlined'
                        sx={{ mb: 1 }}
                        onChange={enteredData}
                        value={userInput.id}
                        disabled
                    />
                    <TextField
                        label='Nickname'
                        name='nickname'
                        variant='outlined'
                        sx={{ mb: 1 }}
                        onChange={enteredData}
                        value={userInput.nickname}
                    />
                    <TextField
                        label='Name'
                        name='name'
                        variant='outlined'
                        sx={{ mb: 1 }}
                        onChange={enteredData}
                        value={userInput.name}
                    />
                    <TextField
                        type='number'
                        label='Age'
                        name='age'
                        variant='outlined'
                        sx={{ mb: 1 }}
                        onChange={enteredData}
                        value={userInput.age}
                    />
                    <TextField
                        label='Nationality'
                        name='nationality'
                        variant='outlined'
                        sx={{ mb: 1 }}
                        onChange={enteredData}
                        value={userInput.nationality}
                    />
                    <Box display='flex' flexDirection='column' mb={1}>
                        <FormLabel>Is Active</FormLabel>
                        <RadioGroup
                            sx={{ display: 'inline-block' }}
                            onChange={(e) => {
                                onChangeHandler(e);
                                enteredData(e);
                            }}
                            value={userInput.isActive}
                        >
                            <FormControlLabel
                                value='true'
                                name='isActive'
                                control={<Radio />}
                                label='True'
                            />
                            <FormControlLabel
                                value='false'
                                name='isActive'
                                control={<Radio />}
                                label='False'
                            />
                        </RadioGroup>
                    </Box>
                    {showSelectList === 'true' && (
                        <Select
                            native
                            sx={{ textAlign: 'left' }}
                            name='teamId'
                            onChange={enteredData}
                            value={userInput.teamId}
                        >
                            <option value='' disabled>
                                Team
                            </option>
                            {teamsList.map((team) => (
                                <option key={team.id} value={team.id!}>
                                    {team.name}
                                </option>
                            ))}
                        </Select>
                    )}
                    <Box display='flex' flexDirection='column' my={2}>
                        <FormLabel sx={{ textAlign: 'left', mb: 1 }}>
                            Trophies
                        </FormLabel>
                        {trophiesList.map((trophy) => (
                            <Box key={trophy.id} sx={customCheckboxDivStyle}>
                                <input
                                    type='checkbox'
                                    id={trophy.id!}
                                    name='trophyIds'
                                    checked={filteredTrophiesList.includes(
                                        trophy.id!
                                    )}
                                    value={trophy.id!}
                                    onChange={() => handleCheck(trophy.id)}
                                    style={customCheckboxStyle}
                                />
                                <label htmlFor={trophy.id!}>
                                    {trophy.name}
                                </label>
                            </Box>
                        ))}
                    </Box>
                    <LoadingButton
                        loading={status === 'pendingEditPlayer' ? true : false}
                        type='submit'
                        variant='contained'
                        size='large'
                    >
                        Update Player
                    </LoadingButton>
                </FormControl>
            </Box>
        </Container>
    );
};

export default PlayerFormEdit;
