import { EditEmployeeDto } from '../../src/employee/dto';

export const Employee = (pactum) => {
  describe('Get me', () => {
    // ! I must still come back to edit this as this should be a descriptive get of all the things pertaining to an employee
    it('should get current signed in employee', () => {
      return pactum
        .spec()
        .get('/employees/me')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200)
        .stores('employeeId', 'id')
    });
  });

  describe('Get me', () => {
    it('should get current signed in employee', () => {
      return pactum
        .spec()
        .get('/employees/me')
        .withHeaders({
          Authorization: 'Bearer $S{employeeAt}',
        })
        .expectStatus(200) 
        .stores('employeeId2', 'id')
    });
  });

  describe('Get employee by Id', () => {
    it('should get employee by Id', () => {
      return pactum
        .spec()
        .get('/employees/{id}') 
        .withPathParams('id', '$S{employeeId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectBodyContains('$S{employeeId}') 
    });
  });

  describe('Get employees', () => {
    it('should get all employees', () => {
      return pactum
        .spec()
        .get('/employees')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectJsonLength(3) 
    });
  });

  describe('Edit employee', () => {

    it('should edit employee with address, education, workexperiences', () => { 
      const dto: EditEmployeeDto = {  
        firstName: 'Debbie',
        email: 'debbie@tonote.com',
        address: {city: 'Lagos', street: 'Ondo street', country: 'Nigeria'},
        workExperiences: [{fromDate: new Date(), toDate: new Date(), companyName: 'DeniafeHub', designation: 'Lead Engineer'}],
        education: [{school: 'FCE', degree: 'NCE', year: '2011', grade: '4.5GPA'}]
      };
      return pactum
        .spec()
        .patch('/employees/{id}') 
        .withPathParams('id', '$S{employeeId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .withBody({
          ...dto,
          // projectId: '$S{projectId}'
        })
        .expectStatus(200)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(dto.email)
    });
  });

  describe('Delete employee by id', () => {
    it('should delete employee', () => {
      return pactum
        .spec()
        .delete('/employees/{id}')
        .withPathParams('id', '$S{employeeId2}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(204);
    });

    it('should get just one employee', () => {
      return pactum
        .spec()
        .get('/employees')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectJsonLength(2);
    });
  });
}