import { useEffect, useState } from 'react';
import axiosApi from '../api/axiosApi';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Cocktail {
    _id: string;
    name: string;
    image: string;
}

const CocktailsPage = () => {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosApi.get('/cocktails');
            setCocktails(response.data);
        };

        fetchData();
    }, []);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                padding: '20px'
            }}
        >
            {cocktails.map(c => (
                <Card
                    key={c._id}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/cocktail/${c._id}`)}
                >
                    {c.image && (
                        <CardMedia
                            component="img"
                            height="200"
                            image={c.image}
                            alt={c.name}
                        />
                    )}

                    <CardContent>
                        <Typography variant="h6">
                            {c.name}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default CocktailsPage;