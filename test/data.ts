export enum Animal {
  cat = 'cat',
  dog = 'dog',
  snake = 'snake',
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
  }
}

export const petAppData = {
  accounts: {
    'user-id-1': {
      data: {
        name: 'cedric',
        age: 30,
        likes: [Animal.cat, Animal.dog]
      } as Account,
      collections: {
        pets: {
          'pet-id-1': {
            data: {
              name: 'Pita',
              age: 3,
              animal: Animal.cat,
            } as Pet
          }
        },
      },
    },
    'user-id-2': {
      data: {
        name: 'Jake',
        age: 10,
        likes: [Animal.snake, Animal.dog],
      } as Account,
      collections: {
        pets: {
          'pet-id-2': {
            data: {
              name: 'George',
              age: 10,
              animal: Animal.snake,
            } as Pet
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
      } as Park
    },
    'park-id-2': {
      data: {
        animalPolicy: {
          acceptedAnimals: [Animal.snake],
          favoriteAnimal: Animal.snake
        }
      } as Park
    }
  }
};
