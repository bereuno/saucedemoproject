import { test as base } from '@playwright/test';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

type Credential = {
  username: string;
  password: string;
};

type CsvFixtures = {
  credentials: Credential[];
};

export const test = base.extend<CsvFixtures>({
  credentials: async ({}, use) => {
    const filePath = path.resolve(__dirname, '../data/credentials.csv');
    const fileContent = readFileSync(filePath, 'utf-8');

    const records: Credential[] = parse(fileContent, {
      columns: true,        // usa la primera fila como keys del JSON
      skip_empty_lines: true,
      trim: true
    });

    await use(records);
  }
});

export { expect } from '@playwright/test';