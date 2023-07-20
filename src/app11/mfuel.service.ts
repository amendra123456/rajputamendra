import { Injectable } from '@angular/core';
import { Buffer } from "buffer";
import {environment} from "../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class MfuelService {

  constructor() { }

  getS(key: any) {
    let _r = sessionStorage.getItem(key);
    if(_r && environment.securitySession){
      let _rs = this.decrptData(_r);
      console.log("console session data",_rs);
      return _rs;
    }else{
      return _r;
    }

  }
  setS(key: any, val: any) {
    if(environment.securitySession){
      let _cms = this.encrptData(val)
      sessionStorage.setItem(key, _cms);
    }else{
      sessionStorage.setItem(key,val);
    }
    
  }

  encrptData = (input: any = "") => {
    let s = "";
    let d = "";
    s = Buffer.from('hash2 keyword uses for the encryption as string', "utf8").toString('base64');
    s = s.replace(/a/g, 'aTmopp');
    d = input.toString();
    d = s + "#s-r" + Buffer.from(d, "utf8").toString('base64') + "?p-r" + Buffer.from('encryption', "utf8").toString('base64');
    d = Buffer.from(d, "utf8").toString('base64');
    //console.log("checking de-conversion", this.decrptData(d));
    return d;
  }

  decrptData(srr: any) {
    //console.log("srr",srr);
    let sArrString = Buffer.from(srr, 'base64').toString('ascii');
    let keyStringRaw = sArrString.split("#s-r")[0];
    let keyStringRawStr = keyStringRaw.replace(/aTmopp/g, "a");
    let keyString = Buffer.from(keyStringRawStr, 'base64').toString('ascii');
    if (keyString === "hash2 keyword uses for the encryption as string") {
      let stringRawArr = sArrString.split("#s-r")[1];
      let stringRaw = stringRawArr.split("?p-r")[0];
      let stringStr = Buffer.from(stringRaw, 'base64').toString('ascii');

      return stringStr;
    } else {
      return "";
    }
  }
}
