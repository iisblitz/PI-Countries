const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');

const agent = session(app);
const activity = {
  name: 'SKY',
  dificultad: 1,
  duracion: 1,
  temporada: 'Otoño'
};

describe('Activity routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Activity.sync({ force: true })
    .then(() => Activity.create(activity)));
  describe('POST /activity', () => {
    it('should get 201', () =>
      agent.post('/activity')
        .send({
            name: 'SKY',
            dificultad: 1,
            duracion: 1,
            temporada: 'Otoño',
            idPais: ['ARG']
        })
        .expect(201)
    );
    it('tira error si falta un parámetro', () =>
      agent.post('/activity')
        .send({
            name: 'SKY',
            dificultad: 1,
            temporada: 'Otoño',
            idPais: ['ARG']
        })
        .expect(400)
    );
  });
});