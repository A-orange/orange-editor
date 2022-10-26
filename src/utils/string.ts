export function rnd():string {
  return Math.abs(Date.now() + Math.random() * 1000 | 0).toString(32);
}