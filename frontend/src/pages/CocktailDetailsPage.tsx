import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { Box, Typography, Rating } from '@mui/material';
import { useAppSelector } from '../app/hooks';

interface Ingredient {
    name: string;
    amount: string;
}

interface Cocktail {
    _id: string;
    name: string;
    image: string;
    recipe: string;
    ingredients: Ingredient[];
    avgRating: number;
    ratingsCount: number;
}

const CocktailDetailsPage = () => {
    const { id } = useParams();
    const user = useAppSelector(state => state.user.user);

    const [cocktail, setCocktail] = useState<Cocktail | null>(null);
    const [value, setValue] = useState<number | null>(0);

    const fetchCocktail = async () => {
        const response = await axiosApi.get(`/cocktails/${id}`);
        setCocktail(response.data);
    };

    useEffect(() => {
        fetchCocktail();
    }, [id]);

    const handleRating = async (_: any, newValue: number | null) => {
        if (!newValue) return;

        setValue(newValue);

        await axiosApi.post(`/cocktails/${id}/rating`, {
            value: newValue
        });

        await fetchCocktail();
    };

    if (!cocktail) {
        return <Typography sx={{ p: 3 }}>Loading...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
            <Typography variant="h4">
                {cocktail.name}
            </Typography>

            <Typography sx={{ mt: 1 }}>
                Rating: {cocktail.avgRating?.toFixed(1) || 0} ({cocktail.ratingsCount} votes)
            </Typography>

            {user && (
                <Rating
                    sx={{ mt: 1 }}
                    value={value}
                    onChange={handleRating}
                />
            )}

            {cocktail.image && (
                <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    style={{ width: '100%', marginTop: 16 }}
                />
            )}

            <Typography variant="h6" sx={{ mt: 3 }}>
                Ingredients:
            </Typography>

            {cocktail.ingredients.map((ing, index) => (
                <Typography key={index}>
                    {ing.name} — {ing.amount}
                </Typography>
            ))}

            <Typography variant="h6" sx={{ mt: 3 }}>
                Recipe:
            </Typography>

            <Typography>
                {cocktail.recipe}
            </Typography>
        </Box>
    );
};

export default CocktailDetailsPage;