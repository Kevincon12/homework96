import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { Box, Typography } from '@mui/material';

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
}

const CocktailDetailsPage = () => {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosApi.get(`/cocktails/${id}`);
            setCocktail(response.data);
        };

        fetchData();
    }, [id]);

    if (!cocktail) {
        return <Typography sx={{ p: 3 }}>Loading...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
            <Typography variant="h4">
                {cocktail.name}
            </Typography>

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