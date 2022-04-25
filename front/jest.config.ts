import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.spec.ts'],
  transform: {
    '^.+\\.vue$': 'vue3-jest',
  },
  setupFiles: ['core-js'],
  moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,vue}', '!src/**/*.d.ts', '!src/main.ts'],
}

export default config
