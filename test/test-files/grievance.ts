import { CreateGrievanceDto, EditGrievanceDto } from '../../src/grievance/dto';

export const Grievance = (pactum) => {
  describe('Get empty grievances', () => {  
    it('should get empty array of grievances', () => {
      return pactum 
        .spec()
        .get('/grievances')  
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200) 
        .expectBody([])
    });
  });

  describe('Create grievance', () => { 
    const dto: CreateGrievanceDto = {
      title: 'I was wronged',  
      details: 'I was denied my rightful position'
    };
    it('should create activity', () => {
      return pactum
        .spec()
        .post('/grievances') 
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('grievanceId', 'id') 
    });
  }); 

  describe('Get grievance by Id', () => { 
    it('should get grievance by Id', () => {
      return pactum
        .spec() 
        .get('/grievances/{id}') 
        .withPathParams('id', '$S{grievanceId}') 
        .withHeaders({ 
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200) 
    });
  });

  describe('Get grievances', () => { 
    it('should get all grievances', () => {  
      return pactum
        .spec()
        .get('/grievances')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectJsonLength(1) 
    });
  });

  describe('Edit grievance', () => { 
    it('should edit a grievance', () => {
      const dto: EditGrievanceDto = {
        title: 'This is wrong',  
        details: 'I was denied my rightful post'
      };
      return pactum
        .spec()
        .patch('/grievances/{id}') 
        .withPathParams('id', '$S{grievanceId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.title) 
    });
  });

  describe('Delete grievance by id', () => {
    it('should delete grievance', () => {
      return pactum
        .spec()
        .delete('/grievances/{id}')
        .withPathParams('id', '$S{grievanceId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(204);
    });

    it('should get an empty grievance', () => {
      return pactum
        .spec()
        .get('/grievances')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectBody([])
    });
  });
}