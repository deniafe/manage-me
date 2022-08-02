import { CreateProjectDto, EditProjectDto, Status } from '../../src/project/dto';

export const Project = (pactum) => {
  describe('Get empty projects', () => { 
    it('should get projects', () => {
      return pactum 
        .spec()
        .get('/projects')  
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200) 
        .expectBody([])
    });
  });

  describe('Create project', () => {
    const dto: CreateProjectDto = {
      title: 'First Project'
    };
    it('should create project', () => {
      return pactum
        .spec()
        .post('/projects')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .withBody({
          ...dto,
          employees: [{id: '$S{employeeId}'}]
        })
        .expectStatus(201)
        .stores('projectId', 'id')
    });
  });

  describe('Get project by Id', () => {
    it('should get project by Id', () => {
      return pactum
        .spec()
        .get('/projects/{id}') 
        .withPathParams('id', '$S{projectId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectBodyContains('$S{projectId}') 
    });
  });

  describe('Get projects', () => {
    it('should get all projects', () => {  
      return pactum
        .spec()
        .get('/projects')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectJsonLength(1) 
    });
  });

  describe('Edit project', () => { 
    it('should edit a project', () => {
      const dto: EditProjectDto = {
        description: 'The first project to execute',
        status: Status.ACTIVE,
      };
      return pactum
        .spec()
        .patch('/projects/{id}') 
        .withPathParams('id', '$S{projectId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.description) 
    });
  });

  describe('Delete Project by id', () => {
    it('should delete project', () => {
      return pactum
        .spec()
        .delete('/projects/{id}')
        .withPathParams('id', '$S{projectId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(204);
    });

    it('should get an empty project', () => {
      return pactum
        .spec()
        .get('/projects')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectBody([])
    });
  });
}