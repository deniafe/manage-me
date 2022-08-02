import { CreateSalaryDto, EditSalaryDto } from '../../src/salary/dto';

export const Salary = (pactum) => {
  describe('Get empty salaries', () => { 
    it('should get salaries', () => {
      return pactum 
        .spec()
        .get('/salaries')  
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200) 
        .expectBody([])
    });
  });

  describe('Create salary', () => {
    const dto: CreateSalaryDto = {
      basicSalary: '200,000', 
      bankName: 'First Bank',
      accountNumber: '111100000',
      accountName: 'Debbie',
      employeeId: 1, 
    };
    it('should create salary', () => {
      return pactum
        .spec()
        .post('/salaries') 
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .withBody({
          ...dto,
          employeeId: '$S{employeeId}'
        })
        .expectStatus(201)
        .stores('salaryId', 'id') 
    });
  }); 

  describe('Get salary by Id', () => {
    it('should get salary by Id', () => {
      return pactum
        .spec() 
        .get('/salaries/{id}') 
        .withPathParams('id', '$S{salaryId}') 
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectBodyContains('$S{salaryId}') 
    });
  });

  describe('Get salaries', () => {
    it('should get all salaries', () => {  
      return pactum
        .spec()
        .get('/salaries')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectJsonLength(1) 
    });
  });

  describe('Edit salary', () => { 
    it('should edit a salary', () => {
      const dto: EditSalaryDto = {
        basicSalary: '500,000',
      };
      return pactum
        .spec()
        .patch('/salaries/{id}') 
        .withPathParams('id', '$S{salaryId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.basicSalary) 
    });
  });

  describe('Delete Salary by id', () => { 
    it('should delete salary', () => {
      return pactum
        .spec()
        .delete('/salaries/{id}')
        .withPathParams('id', '$S{salaryId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(204);
    });

    it('should get an empty salary', () => {
      return pactum
        .spec()
        .get('/salaries')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectBody([])
    });
  });
}