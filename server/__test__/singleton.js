
const { mockDeep, mockReset, DeepMockProxy } = require('jest-mock-extended'
const prisma = require("../config/prismaConfig");

jest.mock('../config/prismaConfig', () => ({
  __esModule: true,
  default: mockDeep(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

module.exports = prisma 