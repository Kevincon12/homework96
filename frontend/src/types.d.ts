export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string | null;
    role: string;
    token: string;
}

export interface Ingredient {
    name: string;
    amount: string;
}

export interface Rating {
    user: string;
    value: number;
}

export interface Cocktail {
    _id: string;
    name: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    user: string;
    ingredients: Ingredient[];
    ratings: Rating[];
}