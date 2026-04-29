import express from 'express';
import auth, { AuthRequest } from '../middleware/auth';
import CocktailModel from '../models/Cocktail';

const cocktailsRouter = express.Router();

cocktailsRouter.post('/', auth, async (req: AuthRequest, res) => {
    try {
        const { name, image, recipe, ingredients } = req.body;

        const cocktail = new CocktailModel({
            name,
            image,
            recipe,
            ingredients,
            isPublished: false,
            user: req.user?._id,
            ratings: []
        });

        await cocktail.save();

        res.send({
            message: 'Cocktail created successfully',
            cocktail
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

cocktailsRouter.get('/mine', auth, async (req: AuthRequest, res) => {
    try {
        const cocktails = await CocktailModel.find({
            user: req.user?._id
        });

        res.send(cocktails);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

cocktailsRouter.get('/', async (req, res) => {
    try {
        const cocktails = await CocktailModel.find({
            isPublished: true
        });

        res.send(cocktails);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

cocktailsRouter.get('/:id', async (req, res) => {
    try {
        const cocktail = await CocktailModel.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({ error: 'Not found' });
        }

        const ratings = cocktail.ratings || [];

        const avgRating =
            ratings.length > 0
                ? ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length
                : 0;

        res.send({
            ...cocktail.toObject(),
            avgRating,
            ratingsCount: ratings.length
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

cocktailsRouter.patch('/:id/publish', auth, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).send({ error: 'Forbidden' });
        }

        const cocktail = await CocktailModel.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({ error: 'Not found' });
        }

        cocktail.isPublished = true;
        await cocktail.save();

        res.send({
            message: 'Cocktail published',
            cocktail
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

cocktailsRouter.delete('/:id', auth, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).send({ error: 'Forbidden' });
        }

        const cocktail = await CocktailModel.findByIdAndDelete(req.params.id);

        if (!cocktail) {
            return res.status(404).send({ error: 'Not found' });
        }

        res.send({
            message: 'Cocktail deleted'
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

cocktailsRouter.post('/:id/rating', auth, async (req: AuthRequest, res) => {
    try {
        const { value } = req.body;

        const cocktail = await CocktailModel.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({ error: 'Not found' });
        }

        const existing = cocktail.ratings.find(
            (r: any) => r.user.toString() === req.user?._id.toString()
        );

        if (existing) {
            existing.value = value;
        } else {
            cocktail.ratings.push({
                user: req.user?._id,
                value
            });
        }

        await cocktail.save();

        const ratings = cocktail.ratings;

        const avgRating =
            ratings.length > 0
                ? ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length
                : 0;

        res.send({
            message: 'Rating saved',
            avgRating,
            ratingsCount: ratings.length
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

export default cocktailsRouter;