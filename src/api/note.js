import axios from 'axios'
import { request } from '@/utils/request'
//获取最新笔记
export function GetNoteNewList(id) {
    const url = request.baseURL + '/api/note/GetNoteNewList';
    const data={
        id:id
    };
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data);
    });
};
//修改该新增操作
export function ModifyOrAdd(data) {
    const url = request.baseURL + '/api/note/ModifyOrAdd';
    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data);
    });
};
//获取静态枚举
export function GetEnumTypeList() {
    const url = request.baseURL + '/api/note/GetEnumTypeList';
    const data={
    };
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data);
    });
};
//Search
export function Search(keyword,uid) {
    const url = request.baseURL + '/api/note/Search';
    const data = {
        keyword: keyword,
        uid:uid
    };
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data);
    });
};
//收藏列表
export function GetCollectList(uid) {
  const url = request.baseURL + '/api/note/GetCollectList';
  const data = {
    uid: uid
  };
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
};
//编辑数据
export function GetModifyData(id) {
  const url = request.baseURL + '/api/note/GetModifyData';
  const data = {
    id: id
  };
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
};
//更多数据
export function GetNotePageList(data) {
    const url = request.baseURL + '/api/note/GetNotePageList';
    // const data = {
    //   id: id
    // };
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data);
    });
  };
  //回收站数据GetRecyclebinList
  export function GetRecyclebinList(data) {
    const url = request.baseURL + '/api/note/GetRecyclebinList';
    // const data = {
    //   id: id
    // };
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data);
    });
  };
  //恢复 或者恢复 HandleDel
  export function HandleDel(id) {
      const data={
      Id:id
    }
    const url = request.baseURL + '/api/note/HandleDel';
    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data);
    });
};
//真删除  单个或批量RealDel
export function RealDel(data) {
  const url = request.baseURL + '/api/note/RealDel';
  return axios.post(url, data).then((res) => {
      return Promise.resolve(res.data);
  });
};
//获取推荐
export function GetCommandList(data) {
  const url = request.baseURL + '/api/note/GetCommandList';
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
};
//收藏
export function HandleCollect(data) {
  const url = request.baseURL + '/api/note/HandleCollect';
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data);
  }); 
};



