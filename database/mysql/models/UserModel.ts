import AbstractModel from './AbstractModel';
import { TUserRowDataPacket } from '../../types';
import { ETables } from '../../utils/tables';

class UserModel extends AbstractModel<TUserRowDataPacket> {
  protected columnsForCreate = ['email', 'password', 'name'];

  constructor() {
    super(ETables.Users);
  }
}

export default UserModel;

// retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Tutorial[]> {
//   let query: string = "SELECT * FROM tutorials";
//   let condition: string = "";

//   if (searchParams?.published)
//     condition += "published = TRUE"

//   if (searchParams?.title)
//     condition += `LOWER(title) LIKE '%${searchParams.title}%'`

//   if (condition.length)
//     query += " WHERE " + condition;

//   return new Promise((resolve, reject) => {
//     connection.query<Tutorial[]>(query, (err, res) => {
//       if (err) reject(err);
//       else resolve(res);
//     });
//   });
// }

// const conditions: UserConditions = {
//   name: 'John',
//   age: 30,
// };

// try {
//   const users: TUser[] = await userModel.find(conditions);
//   console.log('Найденные пользователи:', users);
// } catch (error) {
//   console.error('Ошибка поиска пользователей:', error.message);
// }
