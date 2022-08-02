import { CreateLeaveDto, EditLeaveDto, ApproveLeaveDto, LeaveStatus, LeaveType } from '../../src/leave/dto';

export const Leave = (pactum) => {
  describe('Get empty leave applications', () => {  
    it('should get empty leave applications', () => {
      return pactum 
        .spec()
        .get('/leaves')  
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200) 
        .expectBody([])
    });
  });

  describe('Create leave', () => {
    const dto: CreateLeaveDto = {
      fromDate: new Date('08/10/2022'),
      toDate: new Date('08/25/2022'),
      reasonForLeave: 'Vacation',
      type: LeaveType.UNPAID,
    };

    it('should create leave', () => {
      return pactum
        .spec()
        .post('/leaves') 
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('leaveId', 'id') 
    });
  }); 

  describe('Get leave by Id', () => { 
    it('should get leave by Id', () => {
      return pactum
        .spec() 
        .get('/leaves/{id}') 
        .withPathParams('id', '$S{leaveId}') 
        .withHeaders({ 
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200) 
    });
  });

  describe('Get leaves', () => { 
    it('should get all leaves', () => {  
      return pactum
        .spec()
        .get('/leaves')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .expectJsonLength(1) 
    });
  });

  describe('Edit leave', () => { 
    it('should edit leave', () => { 
      const dto: EditLeaveDto = {
        type: LeaveType.SABBATICAL,
      };
      return pactum
        .spec()
        .patch('/leaves/{id}') 
        .withPathParams('id', '$S{leaveId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.type) 
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
        .inspect()
    });
  });

  describe('Approve leave', () => { 
    it('should approve a leave status', () => {
      const dto: ApproveLeaveDto = {
        status: LeaveStatus.APPROVED,
      };
      return pactum
        .spec()
        .patch('/leaves/manage/{id}') 
        .withPathParams('id', '$S{leaveId}')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.status)
    });
  });

   // describe('Delete Leave by id', () => {
    //   it('should delete leave', () => {
    //     return pactum
    //       .spec()
    //       .delete('/leaves/{id}')
    //       .withPathParams('id', '$S{leaveId}')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{userAt}',
    //       })
    //       .expectStatus(204);
    //   });
  
    //   it('should get an empty leave', () => {
    //     return pactum
    //       .spec()
    //       .get('/leaves')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{adminAt}',
    //       })
    //       .expectStatus(200)
    //       .expectBody([])
    //   });
    // });
}