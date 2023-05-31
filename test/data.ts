export enum Animal {
  cat = 'cat',
  dog = 'dog',
  snake = 'snake',
}

export interface Person {
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
  acceptedAnimals: Animal[];
}

export const petAppData = {
  accounts: {
    'user-id-1': {
      data: {
        name: 'cedric',
        age: 30,
        likes: [Animal.cat, Animal.dog]
      } as Person,
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
        age: 30,
        likes: [Animal.snake, Animal.dog],
      } as Person,
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
        acceptedAnimals: [Animal.dog],
      } as Park
    }
  }
};