import React, { FC, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { TodoCard } from '../todo-card';

type AddTodoProps = {
    onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const AddTodo: FC<AddTodoProps> = (props) => {
    const { onKeyPress } = props;
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
                        onKeyPress={onKeyPress}
                    />
                </Box>
            </CardContent>
        </TodoCard>
    );
};
