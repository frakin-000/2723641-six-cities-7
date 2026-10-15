export function getRandomInteger(
  min: number,
  max: number
): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomInteger(0, items.length - 1)];
}

export function getRandomItems<T>(
  items: T[],
  count: number
): T[] {
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

export function getRandomBoolean(): boolean {
  return Math.random() >= 0.5;
}