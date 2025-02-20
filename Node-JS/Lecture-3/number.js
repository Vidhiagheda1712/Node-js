

let cnt =0;
const demo =()=>{
    cnt++;
    if(cnt<=10){
        console.log(`${cnt}`);
    }
}
setInterval(demo,1000);