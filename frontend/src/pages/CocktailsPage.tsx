import { useEffect, useState } from 'react';
import axiosApi from '../api/axiosApi';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import Loader from '../components/Loader';

interface Cocktail {
    _id: string;
    name: string;
    image: string;
    isPublished: boolean;
}

const CocktailsPage = () => {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await axiosApi.get('/cocktails');
            setCocktails(response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const publishToggle = async (id: string) => {
        await axiosApi.patch(`/cocktails/${id}/publish`);
        fetchData();
    };

    const deleteCocktail = async (id: string) => {
        await axiosApi.delete(`/cocktails/${id}`);
        fetchData();
    };

    if (loading) return <Loader />;

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 20,
                padding: 20
            }}
        >
            {cocktails.map(c => (
                <Card key={c._id}>
                    <div
                        onClick={() => navigate(`/cocktail/${c._id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {c.image && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={c.image}
                            />
                        )}

                        <CardContent>
                            <Typography variant="h6">
                                {c.name}
                            </Typography>

                            {user?.role === 'admin' && !c.isPublished && (
                                <Typography color="error">
                                    Unpublished
                                </Typography>
                            )}
                        </CardContent>
                    </div>

                    {user?.role === 'admin' && (
                        <div style={{ display: 'flex', gap: 8, padding: 10 }}>
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
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default CocktailsPage;