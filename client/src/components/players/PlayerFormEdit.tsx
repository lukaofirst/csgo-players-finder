import { LoadingButton } from '@mui/lab';
import {
    Box,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
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
import { PlayerDTO } from '../../models/DTO/PlayerDTO';
import { TrophyId } from '../../models/TrophyId';
import { editPlayerAsync, fetchPlayerAsync } from '../../store/playersSlice';
import { fetchTeamsAsync } from '../../store/teamsSlice';
import { fetchTrophiesAsync } from '../../store/trophiesSlice';
import BackBtn from '../utils/BackBtn';
import LoadingComponent from '../utils/LoadingComponent';

const PlayerFormEdit = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { player, status } = useAppSelector((state) => state.players);
    const { teamsList, teamsLoaded } = useAppSelector((state) => state.teams);
    const { trophiesList, trophiesLoaded } = useAppSelector(
        (state) => state.trophies
    );

    const [showSelectList, setShowSelectList] = useState('true');
    const [userInput, setUserInput] = useState<PlayerDTO>({
        id: player?.id,
        nickname: player?.nickname!,
        name: player?.name!,
        age: player?.age!,
        nationality: player?.nationality!,
        isActive: player?.isActive!,
        teamId: player?.team?.id,
        trophies: [],
    });

    useEffect(() => {
        dispatch(fetchPlayerAsync(+id!));
        dispatch(fetchTeamsAsync());
        dispatch(fetchTrophiesAsync());

        setUserInput({
            id: player?.id,
            nickname: player?.nickname!,
            name: player?.name!,
            age: player?.age!,
            nationality: player?.nationality!,
            isActive: player?.isActive!,
            teamId: player?.team?.id,
            trophies: [],
        });
    }, [
        dispatch,
        id,
        player?.age,
        player?.id,
        player?.isActive,
        player?.name,
        player?.nationality,
        player?.nickname,
        player?.team?.id,
    ]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setShowSelectList(e.target.value);
    };

    const enteredData = (e: any) => {
        if (e.target.name === 'trophies') {
            const checkboxPlayerTrophies: NodeList =
                document.querySelectorAll('[name=trophies]');

            let playerTrophiesArr: any[] = [];

            checkboxPlayerTrophies.forEach((item: any) => {
                const trophyObj = { trophy: { id: +item.value } };

                if (item.checked === true) {
                    if (!playerTrophiesArr.includes(trophyObj)) {
                        playerTrophiesArr.push(trophyObj);
                    } else {
                        playerTrophiesArr = playerTrophiesArr.filter(
                            (t) => t.trophyId !== trophyObj.trophy.id
                        );
                    }
                }
            });

            setUserInput((prevState) => {
                userInput.trophies = playerTrophiesArr;
                return { ...prevState };
            });
        } else {
            setUserInput((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        const filteredTrophiesList: TrophyId[] = userInput.trophies!.map(
            (item: any) => ({ trophyId: item.trophy.id })
        );

        const playerDTO: PlayerDTO = {
            id: userInput.id,
            nickname: userInput.nickname!,
            name: userInput.name!,
            age: userInput.age!,
            nationality: userInput.nationality!,
            isActive: userInput.isActive!,
            trophies: filteredTrophiesList,
            ...(userInput.isActive! === 'true' && {
                teamId: +userInput.teamId!,
            }),
        };

        try {
            await dispatch(editPlayerAsync(playerDTO));

            setUserInput({
                id: '',
                nickname: '',
                name: '',
                age: '',
                nationality: '',
                isActive: '',
                teamId: '',
                trophies: [],
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (!teamsLoaded || !trophiesLoaded)
        return <LoadingComponent message='Loading all the info needed...' />;

    return (
        <Container maxWidth='lg' sx={{ mt: 2 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
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
                    sx={{ width: '500px', margin: '0 auto' }}
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
                                <option key={team.id} value={team.id}>
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
                            <FormGroup
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                key={trophy.id}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={trophy.id}
                                            onChange={enteredData}
                                        />
                                    }
                                    name='trophies'
                                    label={trophy.name}
                                />
                            </FormGroup>
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
