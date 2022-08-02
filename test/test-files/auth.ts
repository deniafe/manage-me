import { SigninDto, SignupDto } from '../../src/auth/dto';

export const Auth = (pactum) => {    
  
  describe('Register', () => {  
      
    const dto: SignupDto = {
      "email": "admin14@email.com",
      "password": "12345",
      "firstName": "Rebecca",
      "lastName": "Dosumu", 
      "middleName": "Ajoke",
      "gender": "female", 
      "dob": new Date(1657521635030),
      "phone": "8166582459",
      "photo": "https://www.youtube.com/watch?v=GHTA143_b-s&t=114s",
    };

    it('should throw if email empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
    });
    it('should throw if password empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400);
    });
    it('should throw if no body provided', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .expectStatus(400);
    });
    it('should signup', () => {  
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201)
    });
    it('should signup as another employee', () => {  
      return pactum
        .spec()
        .post('/auth/signup')
        .withHeaders({
          Authorization: 'Bearer $S{adminAt}',
        })
        .withBody({  
          ...dto,
          email: 'toyin@email.com'
        })
        .expectStatus(201)
        .stores('employeeAt', 'access_token')
    });
  });

  describe('Signin', () => {

    const adminDto: SigninDto = {
      "email": "admin@tonote.com",
      "password": "12345",
    };

    const dto: SigninDto = {
      "email": "admin14@email.com",
      "password": "12345",
    };

    it('should throw if email empty', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
    });
    it('should throw if password empty', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400);
    });
    it('should throw if no body provided', () => { 
      return pactum
        .spec()
        .post('/auth/signin')
        .expectStatus(400);
    });
    it('should signin', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('userAt', 'access_token')
    });

    it('should signin as admin', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody(adminDto)
        .expectStatus(200)
        .stores('adminAt', 'access_token');
    });
  }); 

}
