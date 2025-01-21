import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const FILE_PATH = fileURLToPath(new URL('../data/users.json', import.meta.url));
const OPTIONS = { encoding: 'utf-8' };

export async function getUsers() {
  const users = await readFile(FILE_PATH, OPTIONS);
  return JSON.parse(users);
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find((user) => user.email === email);
}

const user = await findUserByEmail('hanj2@kakao.com');
console.log(user);

export async function isRegisteredUser() {}

export async function createUser() {}