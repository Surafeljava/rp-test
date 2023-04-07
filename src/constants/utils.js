const utils = {
    addCommaToNumber : (num) => {
        const number = parseFloat(num);

        const nm = String(number).split('.');
        let afterDot = '00';
        if(nm.length===2){
            afterDot = nm[1].length===1 ? `${nm[1]}0` : `${nm[1].substring(0, 2)}`;
        }

        const newNum = String(nm[0]);
        let val = '';
        for(let i=0; i<newNum.length; i++){
            if((newNum.length - (i+1))%3 === 0){
                if(i!==newNum.length-1){
                    val += (newNum[i] + ',');
                }else{
                    val+=newNum[i];
                }
            }else{
                val += newNum[i];
            }
        }
        return `${val}.${afterDot}`;
        // return `${val}`;
    },
}

export default utils;