/**
 * Create mocked data for user
 *
 * @param id
 * @param withId
 */
export function createMockedUser(id: string | number, withId = false) {
  return {
    firstname: `foo${id}`,
    lastname: `bar${id}`,
    email: `foo.bar${id}@foobar.com`,
    password: `foobar${id}`,
    ...(withId && { _id: id.toString() }),
  };
}
