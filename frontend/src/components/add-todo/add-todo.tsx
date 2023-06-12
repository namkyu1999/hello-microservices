import React, { FC, KeyboardEvent, ReactNode, useContext } from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { TodoCard } from '../todo-card';

type AddTodoProps = {
    onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const AddTodo: FC<AddTodoProps> = (props) => {
    return (
        <TodoCard>
            <CardContent
                sx={{
                    p: 0,
                    pl: 3,
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none',
                    },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        id="input-with-sx"
                        fullWidth
                        label="Add Todo"
                        variant="standard"
                        onKeyPress={props.onKeyPress}
                    />
                </Box>
            </CardContent>
        </TodoCard>
    );
};
