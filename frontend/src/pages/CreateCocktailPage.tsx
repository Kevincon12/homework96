import { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axiosApi from '../api/axiosApi';
import { useNavigate } from 'react-router-dom';

interface Ingredient {
    name: string;
    amount: string;
}

const CreateCocktailPage = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [recipe, setRecipe] = useState('');

    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { name: '', amount: '' }
    ]);

    const onIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
        const copy = [...ingredients];
        copy[index][field] = value;
        setIngredients(copy);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '' }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await axiosApi.post('/cocktails', {
            name,
            image,
            recipe,
            ingredients
        });

        navigate('/');

        setName('');
        setImage('');
        setRecipe('');
        setIngredients([{ name: '', amount: '' }]);
    };

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                maxWidth: 600,
                margin: '0 auto',
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Create Cocktail
            </Typography>

            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />

            <TextField
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                fullWidth
            />

            <TextField
                label="Recipe"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                multiline
                rows={4}
                fullWidth
            />

            <Typography variant="h6">
                Ingredients
            </Typography>

            {ingredients.map((ing, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        label="Name"
                        value={ing.name}
                        onChange={(e) =>
                            onIngredientChange(index, 'name', e.target.value)
                        }
                        fullWidth
                    />

                    <TextField
                        label="Amount"
                        value={ing.amount}
                        onChange={(e) =>
                            onIngredientChange(index, 'amount', e.target.value)
                        }
                        fullWidth
                    />

                    <IconButton
                        onClick={() => removeIngredient(index)}
                        disabled={ingredients.length === 1}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            ))}

            <Button
                startIcon={<Add />}
                onClick={addIngredient}
                variant="outlined"
            >
                Add Ingredient
            </Button>

            <Button type="submit" variant="contained">
                Create Cocktail
            </Button>
        </Box>
    );
};

export default CreateCocktailPage;