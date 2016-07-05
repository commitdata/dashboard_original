import { Injectable } from 'angular2/core';
import { Http, Response, Jsonp, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class AeisDictionary{
  public YEAR  : string;
  public TABLE : string;
  public VARIABLE: string;
  public DESCRIPTION: string;
}

@Injectable()
export class AeisService {
    
  constructor(private _jsonp:Jsonp,private _http:Http) {  }

  // Get Tables by Year
  public getTablesByYear  (url: string) : Observable<string[]>  { 
     return this._http.get(url)
            .map((response: Response) => <string[]>response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
  }

  // Get Dictionary by Table
  public getDictionaryByTable  (url: string) : Observable<AeisDictionary[]>  {  
     return this._http.get(url)
            .map((response: Response) => <AeisDictionary[]>response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data))) 
            .catch(this.handleError);
  } 

  // Handle error
  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}


