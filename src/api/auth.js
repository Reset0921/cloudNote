
import axios from 'axios'
import { request } from '@/utils/request'
//该手机号是否被注册
export function VerifyPhoneExisted(phone) {
    const data={
        phone: phone
    }
  const url = request.baseURL + '/api/auth/VerifyPhoneExisted';
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data);
  });
};
//发送验证码
export function SendVCode(phone,code) {
  const data = {
    phone: phone,
    code:code
  }
  const url = request.baseURL + '/api/auth/SendVCode';
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data);
  });
};
//验证手机验证码是否正确

export function SmsVerify(phone, code) {
  const data = {
    phone: phone,
    code: code
  }
  const url = request.baseURL + '/api/auth/SmsVerify';
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data);
  });
};
//登陆
export function Login(phone, pwd) {
  const data = {
    phone: phone,
    pwd: pwd
  }
  const url = request.baseURL + '/api/auth/Login';
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data);
  });
};
//注册
export function Register(phone, pwd) {
  const data = {
    phone: phone,
    pwd: pwd
  }
  const url = request.baseURL + '/api/auth/Register';
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data);
  });
};



