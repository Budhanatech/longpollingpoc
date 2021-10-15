import {expect} from '@loopback/testlab';
import {MongodbDataSource} from '../../datasources';
import {HorseRepository} from '../../repositories/horse.repository';

describe('MongoDB Datasource', () => {
  let ds: MongodbDataSource;
  const testHorse = {name: 'Test_Horse', id: 9999};
  // Setup a hook to stop the datasource created by the test
  afterEach(() => ds?.stop());

  describe('Database integration tests', () => {
    it('Checks if database connected', () => {
      // important: no `const` keyword, use the shared variable
      ds = new MongodbDataSource();
      expect(ds.name).to.equal('mongodb'); // default name
    });

    it('Checks if data can be added to database', async () => {
      ds = new MongodbDataSource();
      const horseRepository = new HorseRepository(ds);
      const dbHorseInstance = await horseRepository.create(testHorse);
      expect(dbHorseInstance.id).to.equal(testHorse.id);
    });

    it('Checks if data can be deleted from database', async () => {
      ds = new MongodbDataSource();
      const horseRepository = new HorseRepository(ds);
      await horseRepository.deleteById(testHorse.id);
    });
  });
});
