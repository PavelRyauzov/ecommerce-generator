import { readFileSync } from 'fs';
import { join } from 'path';

export function rawLoader(filePath: string): string {
  const absolutePath = join(process.cwd(), filePath);
  return readFileSync(absolutePath, 'utf-8');
}