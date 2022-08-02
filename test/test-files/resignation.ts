import { CreateResignationDto, EditResignationDto } from '../../src/resignation/dto';

export const Resignation = (pactum) => {
  describe('Get empty resignations', () => {  
    it('should get empty array of resignations', () => {
      return pactum 
        .spec()
        .get('/resignations')  
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200) 
        .expectBody([])
    });
  });

  describe('Create resignation', () => { 
    const dto: CreateResignationDto = {
      reason: 'Moving on',  
      details: 'I am moving on to get better at my abilities',
      notice: new Date('09/20/2022'),
    };
    it('should create activity', () => {
      return pactum
        .spec()
        .post('/resignations') 
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('resignationId', 'id') 
    });
  }); 

  describe('Get resignation by Id', () => { 
    it('should get resignation by Id', () => {
      return pactum
        .spec() 
        .get('/resignations/{id}') 
        .withPathParams('id', '$S{resignationId}') 
        .withHeaders({ 
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200) 
    });
  });

  describe('Get resignations', () => { 
    it('should get all resignations', () => {  
      return pactum
        .spec()
        .get('/resignations')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectJsonLength(1) 
    });
  });

  describe('Edit resignation', () => { 
    it('should edit a resignation', () => {
      const dto: EditResignationDto = {
        reason: 'Moving on to a higher position',  
      };
      return pactum
        .spec()
        .patch('/resignations/{id}') 
        .withPathParams('id', '$S{resignationId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.reason) 
    });
  });

  describe('Delete resignation by id', () => {
    it('should delete resignation', () => {
      return pactum
        .spec()
        .delete('/resignations/{id}')
        .withPathParams('id', '$S{resignationId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(204);
    });

    it('should get an empty resignations', () => {
      return pactum
        .spec()
        .get('/resignations')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectBody([])
    });
  });
}