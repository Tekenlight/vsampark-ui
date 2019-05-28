
import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { Observable } from 'rxjs/Observable';
    
 @Injectable()
    export class TokenInterceptor implements HttpInterceptor {
      constructor(public jwt_service:JwtService) {}
      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        request = request.clone({ // HttpRequest objects are immutable, so in order to modify them, we need to first make a copy, 
                                  // then modify the copy and call handle on the modified copy.
          setHeaders: {
            "x-access-token": `${this.jwt_service.getToken()}`
          }
        });
        //return
        return next.handle(request); //passing it to the next interceptor (next request) in the chain
      }
    }
