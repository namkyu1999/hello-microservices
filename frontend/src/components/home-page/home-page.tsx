import React, {
    FC,
    useContext,
    useEffect,
    useState,
    ReactNode,
    KeyboardEvent,
} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { CheckIcon, CrossIcon } from '../icons';
import { AuthContext } from '../../providers/auth';
import { AddTodo } from '../add-todo';
import { Todo } from '../../models/todo';
import { TodoCard } from '../todo-card';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

type HomePageButtonProps = {
    active: string;
    children: ReactNode;
    onClick?: () => void;
};
const HomePageButton: FC<HomePageButtonProps> = (props) => {
    const { active = 'false' } = props;
    return (
        <Button
            sx={{ color: active == 'true' ? 'info.light' : 'text.secondary' }}
            {...props}
        >
            {props.children}
        </Button>
    );
};

enum FilterState {
    ACTIVE = 'Active',
    COMPLETED = 'Completed',
}

export const HomePage = () => {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterState>(
        FilterState.ACTIVE
    );
    const isSmallScreen = useMediaQuery('(max-width:375px)');
    const { user } = useContext(AuthContext);
    const fetchTodos = () => {
        if (user) {
            fetch('http://localhost:8001/todo/' + user.username, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + user.access_token,
                },
            })
                .then((res) => res.json())
                .then((resTodos: Todo[]) => {
                    setTodos(resTodos);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    useEffect(fetchTodos, [user]);

    const handleRadioCheck = (todo: Todo) => {
        //TODO: change api endpoint
        if (user) {
            fetch('http://localhost:8001/todo', {
                method: 'PUT',
                body: JSON.stringify({
                    username: user.username,
                    id: todo.id,
                }),
                headers: {
                    Authorization: 'Bearer ' + user.access_token,
                    ContentType: 'application/json',
                },
            })
                .then(() => {
                    fetchTodos();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    const deleteTodo = (todo: Todo) => {
        //TODO: replace endpoint
        if (user) {
            fetch('http://localhost:8001/todo', {
                method: 'DELETE',
                body: JSON.stringify({
                    username: user.username,
                    id: todo.id,
                }),
                headers: {
                    Authorization: 'Bearer ' + user.access_token,
                    ContentType: 'application/json',
                },
            })
                .then(() => {
                    fetchTodos();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const inputValue = (event.target as HTMLInputElement).value;
            if (inputValue && user) {
                //TODO: change api endpoint
                fetch('http://localhost:8001/todo', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: user.username,
                        body: inputValue,
                    }),
                    headers: {
                        Authorization: 'Bearer ' + user.access_token,
                        ContentType: 'application/json',
                    },
                })
                    .then(() => {
                        (event.target as HTMLInputElement).value = '';
                        fetchTodos();
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        }
    };

    const activeTodos = todos?.filter((todo) => !todo.completed) ?? [];
    const filteredTodos = todos?.filter((todo) => {
        const filterCondition =
            activeFilter === FilterState.ACTIVE ? false : true;

        return todo.completed === filterCondition;
    });

    const todoItems = filteredTodos?.map((todo: Todo) => (
        <ListItem
            disablePadding
            sx={{
                p: 0,
                m: 0,
                borderBottom: '1px solid #dfdfdf',
                '& .delete-icon': {
                    visibility: 'hidden',
                },
                '&:hover .delete-icon': {
                    visibility: 'visible',
                },
            }}
            key={todo.id}
        >
            <ListItemButton>
                {todo.completed ? (
                    <CheckIcon />
                ) : (
                    <Radio
                        checked={false}
                        onChange={() => handleRadioCheck(todo)}
                        inputProps={{ 'aria-label': todo.body }}
                    />
                )}

                <ListItemText>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box
                            sx={{
                                textDecoration: todo.completed
                                    ? 'line-through'
                                    : 'none',
                            }}
                            component="span"
                        >
                            {todo.body}
                        </Box>
                        <IconButton
                            className="delete-icon"
                            onClick={() => deleteTodo(todo)}
                        >
                            <CrossIcon />
                        </IconButton>
                    </Grid>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    ));

    return (
        <div>
            <AddTodo onKeyPress={onKeyPress} />
            <TodoCard>
                <CardContent sx={{ p: 0 }}>
                    <List>{todoItems}</List>
                </CardContent>
                <CardActions>
                    <Grid
                        container
                        alignItems={'center'}
                        justifyContent="space-between"
                    >
                        <Box component="span">
                            {activeTodos?.length} items left
                        </Box>
                        {!isSmallScreen && (
                            <Box sx={{ display: 'flex' }}>
                                <HomePageButton
                                    active={
                                        activeFilter === FilterState.ACTIVE
                                            ? 'true'
                                            : 'false'
                                    }
                                    onClick={() =>
                                        setActiveFilter(FilterState.ACTIVE)
                                    }
                                >
                                    Active
                                </HomePageButton>
                                <HomePageButton
                                    active={
                                        activeFilter === FilterState.COMPLETED
                                            ? 'true'
                                            : 'false'
                                    }
                                    onClick={() =>
                                        setActiveFilter(FilterState.COMPLETED)
                                    }
                                >
                                    Completed
                                </HomePageButton>
                            </Box>
                        )}
                    </Grid>
                </CardActions>
            </TodoCard>

            {isSmallScreen && (
                <TodoCard>
                    <CardContent>
                        <HomePageButton
                            active={
                                activeFilter === FilterState.ACTIVE
                                    ? 'true'
                                    : 'false'
                            }
                            onClick={() => setActiveFilter(FilterState.ACTIVE)}
                        >
                            Active
                        </HomePageButton>
                        <HomePageButton
                            active={
                                activeFilter === FilterState.COMPLETED
                                    ? 'true'
                                    : 'false'
                            }
                            onClick={() =>
                                setActiveFilter(FilterState.COMPLETED)
                            }
                        >
                            Completed
                        </HomePageButton>
                    </CardContent>
                </TodoCard>
            )}
        </div>
    );
};
