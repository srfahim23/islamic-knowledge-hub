// This is a simple authentication system. In a real-world application,
// you would use a more secure method, possibly with encryption and a database.

const ADMIN_USERNAME = "srfahim23"
const ADMIN_PASSWORD = "1989132170"

export function authenticate(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

