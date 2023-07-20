import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { Buffer } from "buffer";
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})

export class MfuelExtensionService {

  constructor(private _http: HttpClient) { }

  httpStr: string = "";//window.location.href.substring(0, window.location.href.indexOf(':'));


 encrptData = (input :any = "") => {
  //console.log("moment(new Date()).add(10, 'minutes').unix()",moment(new Date()).add(10, 'minutes').unix())
    let s = "";
    let d = "";
    s = Buffer.from('hash2 keyword uses for the encryption as string',"utf8").toString('base64');
    s = s.replace(/a/g,'aTmopp');
    d = input.toString();
    d = s+"#s-r"+Buffer.from(d,"utf8").toString('base64')+"?p-r"+Buffer.from('encryption',"utf8").toString('base64');
    d = moment(new Date()).add(10, 'minutes').unix()+"q!!02920202"+Buffer.from(d,"utf8").toString('base64');
    //console.log("mmmm", this.decrptData(d));
    return d;
}

 decrptData(srr:any){
  let _cm = srr.split("q!!02920202");
  if(_cm && _cm[1]){
    let sArrString = Buffer.from(_cm[1], 'base64').toString('ascii');
    let keyStringRaw = sArrString.split("#s-r")[0];
    let keyStringRawStr = keyStringRaw.replace(/aTmopp/g,"a");
    let keyString = Buffer.from(keyStringRawStr, 'base64').toString('ascii');
    if(keyString === "hash2 keyword uses for the encryption as string"){
		let stringRawArr = sArrString.split("#s-r")[1];
		let stringRaw = stringRawArr.split("?p-r")[0];
		let stringStr = Buffer.from(stringRaw, 'base64').toString('ascii');
		return stringStr;
	}else{
    return "";
  }
  }else{
    return "";
  }
}


urlChecker = (url:any) => {
  if((url.indexOf("javaapi-prod") > -1 )  || (url.indexOf("javaapiprod") > -1 )  || (url.indexOf("javastaing") > -1 )  || (url.indexOf("nodeapi-prod")> -1) || (url.indexOf("nodeapiprod")> -1) || (url.indexOf("nodestaging")> -1)  || (url.indexOf("localhost:9090")> -1)  || (url.indexOf("192.168.40.150:8086")> -1)  || (url.indexOf("192.168.40.150:8086")> -1)  || (url.indexOf("192.168.40.150:8086")> -1) || (url.indexOf("192.168.40.198:8086")> -1) ){
    //console.log("logging",true)
    return true;
  }else{
    //console.log("logging",false)
    return false
  }
}


  s_t_post(url: string, data: any) {
    let saTkn = null
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    if (saTkn) {
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      return this._http.post(this.httpStr + url, data, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.post(this.httpStr + url, data,{ headers: _hd });
    }

  }
  s_t_put(url: string, data: any) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    let saTkn = null
    //console.log(saTkn);
    if (saTkn) {
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      return this._http.put(this.httpStr + url, data, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.put(this.httpStr + url, data, { headers: _hd });
    }
  }

  s_t_get(url: string) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    let saTkn = null
    if (saTkn) {
      _hd = _hd.set('Accept', 'application/json');
      _hd = _hd.set('Content-Type', 'application/json');
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      // _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
      return this._http.get(this.httpStr + url, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.get(this.httpStr + url, { headers: _hd });
    }
  }

  s_t_delete(url: string) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    let saTkn = null
    if (saTkn) {
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      //console.log(saTkn);
      return this._http.delete(this.httpStr + url, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.delete(this.httpStr + url, { headers: _hd });
    }
  }


  s_t_Multipart(url: string, data: any) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    let saTkn = null
    if (saTkn) {
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      return this._http.post(this.httpStr + url, data, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.post(this.httpStr + url,data, { headers: _hd });
    }

  }

  s_post(url: string, data: any) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    let saTkn = null
    if (saTkn) {
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      return this._http.post(this.httpStr + url, data, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.post(this.httpStr + url, data, { headers: _hd })
    }

  }
  s_put(url: string, data: any) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    let saTkn = null
    //console.log(saTkn);
    if (saTkn) {
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      return this._http.put(this.httpStr + url, data, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.put(this.httpStr + url, data, { headers: _hd })
    }
  }

  s_get(url: string) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      //console.log("whose");
      _hd = _hd.set("API-AUTH-KEY",this.encrptData( moment(new Date()).add(10, 'minutes').unix()   ));
    }else{
      //console.log("vhose");
    }
    let saTkn = null
    if (saTkn) {
      _hd = _hd.set('Accept', 'application/json');
      _hd = _hd.set('Content-Type', 'application/json');
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      return this._http.get(this.httpStr + url, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.get(this.httpStr + url, { headers: _hd })
    }
  }

  s_delete(url: string) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    let saTkn = null
    if (saTkn) {
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      //console.log(saTkn);
      return this._http.delete(this.httpStr + url, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.delete(this.httpStr + url, { headers: _hd })
    }
  }


  s_Multipart(url: string, data: any) {
    let _hd = new HttpHeaders();
    if(this.urlChecker(url)){
      _hd = _hd.set("API-AUTH-KEY",this.encrptData(moment(new Date()).add(10, 'minutes').unix()));
    }
    let saTkn = null
    if (saTkn) {
      _hd = _hd.set("Authorization", `Bearer ${saTkn}`);
      return this._http.post(this.httpStr + url, data, { headers: _hd });
    } else {
      // return new Observable<any>();
      return this._http.post(this.httpStr + url, data, { headers: _hd })
    }

  }

  get(url: string,head:any="") {

    if(head){
      return this._http.get(this.httpStr + url, head);
    }else{
      return this._http.get(this.httpStr + url);
    }
    

  }

  post(url: string, data: any) {
    return this._http.post<any>(this.httpStr + url, data);

  }

  delete(url: string) {
    return this._http.delete(this.httpStr + url)
  }


  put(url: string, data: any) {
    return this._http.put(this.httpStr + url, data)
  }
}
