export default async function Require(url,options){
    let host = process.env.NODE_ENV==='production'?'':'/api';
    let res = await fetch(host+url,{
        ...options,
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data = res.json();
    return data;
}