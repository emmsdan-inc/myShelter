import { faker } from '@faker-js/faker';

export default {
  demoPrayers: Array.from({ length: 20 }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(2),
    id: faker.random.alphaNumeric(15),
  })),
};
