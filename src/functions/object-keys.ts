export type Key<T> = keyof T

export function objectKeys<T extends object>(obj: T): Key<T>[] {
  return Object.keys(obj) as Key<T>[]
}
