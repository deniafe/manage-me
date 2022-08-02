export const Report = (pactum) => {    
  
  describe('Leave reports', () => { 
    it('should generate leaves report', () => {  
      return pactum
        .spec()
        .get('/reports/leave')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .inspect()
    });
  });

  describe('Project reports', () => { 
    it('should generate project report', () => {  
      return pactum
        .spec()
        .get('/reports/project')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .inspect()
    });
  });

  describe('Activity reports', () => { 
    it('should generate activity report', () => {  
      return pactum
        .spec()
        .get('/reports/project')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .expectStatus(200)
        .inspect()
    });
  });

}
