export declare enum Animal {
    cat = "cat",
    dog = "dog",
    snake = "snake"
}
export interface Account {
    name: string;
    age: number;
    likes: Animal[];
}
export interface Pet {
    name: string;
    age: number;
    animal: Animal;
}
export interface Park {
    animalPolicy: {
        acceptedAnimals: Animal[];
        favoriteAnimal: Animal;
    };
}
export declare const petAppData: {
    accounts: {
        'user-id-1': {
            data: Account;
            collections: {
                pets: {
                    'pet-id-1': {
                        data: Pet;
                    };
                };
            };
        };
        'user-id-2': {
            data: Account;
            collections: {
                pets: {
                    'pet-id-2': {
                        data: Pet;
                    };
                };
            };
        };
    };
    parks: {
        'park-id-1': {
            data: Park;
        };
        'park-id-2': {
            data: Park;
        };
    };
};
