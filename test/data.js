"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petAppData = exports.Animal = void 0;
var Animal;
(function (Animal) {
    Animal["cat"] = "cat";
    Animal["dog"] = "dog";
    Animal["snake"] = "snake";
})(Animal = exports.Animal || (exports.Animal = {}));
exports.petAppData = {
    accounts: {
        'user-id-1': {
            data: {
                name: 'cedric',
                age: 30,
                likes: [Animal.cat, Animal.dog]
            },
            collections: {
                pets: {
                    'pet-id-1': {
                        data: {
                            name: 'Pita',
                            age: 3,
                            animal: Animal.cat,
                        }
                    }
                },
            },
        },
        'user-id-2': {
            data: {
                name: 'Jake',
                age: 10,
                likes: [Animal.snake, Animal.dog],
            },
            collections: {
                pets: {
                    'pet-id-2': {
                        data: {
                            name: 'George',
                            age: 10,
                            animal: Animal.snake,
                        }
                    }
                },
            }
        },
    },
    parks: {
        'park-id-1': {
            data: {
                animalPolicy: {
                    acceptedAnimals: [Animal.dog, Animal.cat],
                    favoriteAnimal: Animal.dog
                }
            }
        },
        'park-id-2': {
            data: {
                animalPolicy: {
                    acceptedAnimals: [Animal.snake],
                    favoriteAnimal: Animal.snake
                }
            }
        }
    }
};
