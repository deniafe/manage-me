import { CreateActivityDto, EditActivityDto } from '../../src/activity/dto';

export const Activity = (pactum) => {
  describe('Get empty salaries', () => {  
    it('should get activities', () => {
      return pactum 
        .spec()
        .get('/activities')  
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200) 
        .expectBody([])
    });
  });

  describe('Create activity', () => { 
    const dto: CreateActivityDto = {
      in: new Date(),  
      date: new Date()
    };
    it('should create activity', () => {
      return pactum
        .spec()
        .post('/activities') 
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('activityId', 'id') 
    });
  }); 

  describe('Get activity by Id', () => { 
    it('should get activity by Id', () => {
      return pactum
        .spec() 
        .get('/activities/{id}') 
        .withPathParams('id', '$S{activityId}') 
        .withHeaders({ 
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200) 
    });
  });

  describe('Get activities', () => { 
    it('should get all activities', () => {  
      return pactum
        .spec()
        .get('/activities')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectJsonLength(1) 
    });
  });

  describe('Edit activity', () => { 
    it('should edit an activity', () => {
      const dto: EditActivityDto = {
        out: new Date(),
        tasksForToday: ['Finish Ui designs', 'Attend meeting'],
      };
      return pactum
        .spec()
        .patch('/activities/{id}') 
        .withPathParams('id', '$S{activityId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.out) 
    });
  });

  describe('Delete Activity by id', () => {
    it('should delete activity', () => {
      return pactum
        .spec()
        .delete('/activities/{id}')
        .withPathParams('id', '$S{activityId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(204);
    });

    it('should get an empty activity', () => {
      return pactum
        .spec()
        .get('/activities')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectBody([])
    });
  });
}