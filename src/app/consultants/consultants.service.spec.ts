import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConsultantsService } from './consultants.service';
import { Comment } from '../shared/comment';

describe('ConsultantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          // no more boilerplate code w/ custom providers needed :-)
          HttpClientModule,
          HttpClientTestingModule
        ],
        providers: [
          ConsultantsService
        ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', async(inject([ConsultantsService, HttpTestingController], (service: ConsultantsService, backend: HttpTestingController) => {
    expect(service).toBeTruthy();
    }))
  );

  it('should get a consultant info', async(inject([ConsultantsService, HttpTestingController],
    (service: ConsultantsService, backend: HttpTestingController)  => {
        service.getConsultant("1").subscribe((data: any) => {
          expect(data.name).toBe('Luke Skywalker');
        });

        const req = backend.expectOne(`http://demopeople.exolever.com/api/consultants/1/`, 'call to api');
        expect(req.request.method).toBe('GET');

        req.flush({
          name: 'Luke Skywalker'
        });

        backend.verify();
      })));

  it('should get a list of consultants', async(inject([ConsultantsService, HttpTestingController],
        (service: ConsultantsService, backend: HttpTestingController)  => {
            service.getConsultants().subscribe((data: any) => {
              expect(data.name).toBe('Luke Skywalker');
            });
    
            const req = backend.expectOne(`http://demopeople.exolever.com/api/consultants/`, 'call to api');
            expect(req.request.method).toBe('GET');
    
            req.flush({
              name: 'Luke Skywalker'
            });
    
            backend.verify();
          })));

  it(`should send a comment save request`, async(inject([ConsultantsService, HttpTestingController],
    (service: ConsultantsService, backend: HttpTestingController) => {
      let comment = new Comment(1,new Date(),new Date(),"test subject", "test body","A",5,"user",1);
      service.addComment(comment).subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        const body = new HttpParams({ fromString: req.body });

        return  req.url === service.url + 'comment/'
          && req.method === 'POST'
          && req.headers.get('Content-Type') === 'application/json'
          ;
      }, `POST to 'comment/' with json comment info`);
  })));

});
