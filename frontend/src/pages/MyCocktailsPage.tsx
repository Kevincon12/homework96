import { useEffect, useState } from 'react';
import axiosApi from '../api/axiosApi';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useAppSelector } from '../app/hooks';

interface Cocktail {
    _id: string;
    name: string;
    image: string;
    isPublished: boolean;
}

const MyCocktailsPage = () => {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user);

    const fetchData = async () => {
        const response = await axiosApi.get('/cocktails/mine');
        setCocktails(response.data);
    };

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const publishToggle = async (id: string) => {
        await axiosApi.patch(`/cocktails/${id}/publish`);
        fetchData();
    };

    const deleteCocktail = async (id: string) => {
        await axiosApi.delete(`/cocktails/${id}`);
        fetchData();
    };

    if (!user) {
        return <Typography sx={{ p: 3 }}>Please login</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 2,
                p: 3
            }}
        >
            {cocktails.map(c => (
                <Card key={c._id}>
                    <div onClick={() => navigate(`/cocktail/${c._id}`)} style={{ cursor: 'pointer' }}>
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

                            {!c.isPublished && (
                                <Typography color="error">
                                    Unpublished
                                </Typography>
                            )}
                        </CardContent>
                    </div>

                    {user.role === 'admin' && (
                        <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => publishToggle(c._id)}
                            >
                                {c.isPublished ? 'Unpublish' : 'Publish'}
                            </Button>

                            <Button
                                size="small"
                                color="error"
                                variant="contained"
                                onClick={() => deleteCocktail(c._id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    )}
                </Card>
            ))}
        </Box>
    );
};

export default MyCocktailsPage;