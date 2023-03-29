// config/jest/setupTests.js
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../src/config/envs', () => ({
  CONFIG: {
    isDev: true,
  },
}));
