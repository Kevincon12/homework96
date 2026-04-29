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

export default cocktailsRouter;