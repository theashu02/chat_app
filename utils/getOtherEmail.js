export default function getOtherEmail(users, currentUser) {
  return users?.filter(user => user !== currentUser.email)[0];
}
