import { testingDB, DBFixture } from 'api/utils/testing_db';

const shared2enId = testingDB.id();
const shared6enId = testingDB.id();

const suggestionSharedId6Title = testingDB.id();
const suggestionSharedId6Enemy = testingDB.id();

const fixtures: DBFixture = {
  settings: [
    {
      features: {
        metadataExtraction: {
          url: 'https://metadataextraction.com',
        },
      },
    },
  ],
  ixsuggestions: [
    {
      entityId: 'shared1',
      propertyName: 'title',
      suggestedValue: 'Red Robin',
      segment: 'Red Robin, a variation on the traditional Robin persona.',
      language: 'en',
      date: 5,
      page: 2,
    },
    {
      entityId: 'shared1',
      propertyName: 'title',
      suggestedValue: 'HCT-04-CR-SC-0074',
      segment: 'Robin Rojo, una variante del Robin tradicional',
      language: 'es',
      date: 5,
      page: 2,
    },
    {
      entityId: 'shared2',
      propertyName: 'super_powers',
      suggestedValue: 'scientific knowledge',
      segment: 'he relies on his own scientific knowledge',
      language: 'en',
      date: 1,
      page: 5,
    },
    {
      entityId: 'shared2',
      propertyName: 'super_powers',
      suggestedValue: 'conocimiento científico',
      segment: 'el confía en su propio conocimiento científico',
      language: 'es',
      date: 1,
      page: 5,
    },
    {
      entityId: 'shared3',
      propertyName: 'title',
      suggestedValue: 'Alfred Pennyworth',
      segment: "Batman's butler, Alfred Pennyworth",
      language: 'en',
      date: 4,
      page: 3,
    },
    {
      entityId: 'shared3',
      propertyName: 'age',
      suggestedValue: 67,
      segment: 'Alfred 67 years old',
      language: 'en',
      date: 4,
      page: 3,
    },
    {
      entityId: 'shared4',
      propertyName: 'title',
      suggestedValue: 'Joker',
      segment: ' Joker is a homicidal psychopath',
      language: 'en',
      date: 3,
      page: 1,
    },
    {
      entityId: 'shared4',
      propertyName: 'age',
      suggestedValue: 45,
      segment: 'Joker age is 45',
      language: 'en',
      date: 4,
      page: 3,
    },
    {
      entityId: 'shared5',
      propertyName: 'title',
      suggestedValue: 'Poison Ivy',
      segment: 'Poison Ivy is a fictional character appearing in comic books',
      language: 'en',
      date: 6,
      page: 2,
    },
    {
      entityId: 'shared5',
      propertyName: 'age',
      suggestedValue: 25,
      segment: 'Poison Ivy 45 years old',
      language: 'en',
      date: 4,
      page: 3,
    },
    {
      _id: suggestionSharedId6Title,
      entityId: 'shared6',
      propertyName: 'title',
      suggestedValue: 'Penguin',
      segment: 'The Penguin is a Gotham City mobster.',
      language: 'en',
      date: 2,
      page: 12,
    },
    {
      _id: suggestionSharedId6Enemy,
      entityId: 'shared6',
      propertyName: 'enemy',
      suggestedValue: 'Batman',
      segment: 'Enemy: Batman',
      language: 'en',
      date: 5,
      page: 3,
    },
  ],
  entities: [
    {
      _id: testingDB.id(),
      sharedId: 'shared1',
      title: 'Robin',
      language: 'en',
    },
    {
      _id: testingDB.id(),
      sharedId: 'shared1',
      title: 'Robin es',
      language: 'es',
    },
    {
      _id: testingDB.id(),
      sharedId: 'shared2',
      title: 'Batman',
      language: 'ar',
      metadata: { super_powers: [{ value: 'scientific knowledge' }] },
    },
    {
      _id: shared2enId,
      sharedId: 'shared2',
      title: 'Batman',
      language: 'en',
      metadata: { super_powers: [{ value: 'scientific knowledge' }] },
    },
    {
      _id: testingDB.id(),
      sharedId: 'shared2',
      title: 'Batman es',
      language: 'es',
      metadata: { super_powers: [{ value: 'scientific knowledge' }] },
    },
    {
      _id: testingDB.id(),
      sharedId: 'shared3',
      title: 'Alfred',
      language: 'en',
      metadata: { age: [{ value: '' }] },
    },
    { _id: testingDB.id(), sharedId: 'shared4', title: 'Joker', language: 'en' },
    {
      _id: testingDB.id(),
      sharedId: 'shared5',
      title: 'Poison Ivy',
      language: 'en',
      metadata: { age: [{ value: 34 }] },
    },
    {
      _id: testingDB.id(),
      sharedId: 'shared6',
      title: 'The Penguin',
      language: 'es',
      metadata: { enemy: [{ value: '' }], age: [{ value: 40 }] },
    },
    {
      _id: shared6enId,
      sharedId: 'shared6',
      title: 'The Penguin',
      language: 'pr',
      metadata: { enemy: [{ value: '' }], age: [{ value: 40 }] },
    },
    {
      _id: testingDB.id(),
      sharedId: 'shared6',
      title: 'The Penguin',
      language: 'en',
      metadata: { enemy: [{ value: '' }], age: [{ value: 40 }] },
    },
  ],
};

export { fixtures, shared2enId, shared6enId, suggestionSharedId6Title, suggestionSharedId6Enemy };
