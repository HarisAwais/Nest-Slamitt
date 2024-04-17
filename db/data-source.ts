import { Users } from 'src/modules/users/entities/users.entities';
import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // ssl: true,
  host: 'localhost',
  port: 5432,
  password: 'postgresql',
  username: 'postgres',
  database: 'slamitt',
  synchronize: true,
  logging: true,
  entities: [Users],
  //   migrations: ['dist/db/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
