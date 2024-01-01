const request = require('supertest');
const app = require('./app');
const NotesModel = require('./src/models/NotesModel'); 
describe('createNote API Test', () => {

  const testNote = {
    title: 'Test Note',
    content: 'This is a test note content',
  };

  it('should create a new note', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send(testNote);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Note Created Successfully!');
    expect(response.body.data).toHaveProperty('_id');

    const createdNote = await NotesModel.findById(response.body.data._id);
    expect(createdNote).toBeTruthy();
    expect(createdNote.title).toBe(testNote.title);
    expect(createdNote.content).toBe(testNote.content);
  });

  it('should handle errors during note creation', async () => {
   
    const response = await request(app)
      .post('/api/v1/createNote')
      .send({
        // Invalid request body
      });

    // Check the response status and content
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('failed to Create Note!');
    expect(response.body).toHaveProperty('error');
  });

});
