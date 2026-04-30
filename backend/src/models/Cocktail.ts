import mongoose, { Schema } from 'mongoose';

const CocktailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    recipe: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ingredients: [
        {
            name: String,
            amount: String
        }
    ],
    ratings: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            value: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            }
        }
    ]
});

const CocktailModel = mongoose.model('Cocktail', CocktailSchema);

export default CocktailModel;