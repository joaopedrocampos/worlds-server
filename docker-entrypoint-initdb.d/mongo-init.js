print('Start #################################################################');

// db = db.getSiblingDB('api_prod_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_prod_db' }],
//   },
// );
// db.createCollection('users');

db = db.getSiblingDB('worlds');
db.createUser(
  {
    user: 'ae_natan',
    pwd: 'mudar1234',
    roles: [{ role: 'readWrite', db: 'worlds' }],
  },
);
db.createCollection('users');

// db = db.getSiblingDB('api_test_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_test_db' }],
//   },
// );
// db.createCollection('users');

print('END #################################################################');