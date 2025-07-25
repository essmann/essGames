export function generateGuidInteger(){
    const intGuid = Date.now().toString() + Math.floor(Math.random() * 1e5).toString().padStart(5, '0');
    console.log(intGuid); // e.g. "172191404322843512"
    return parseInt(intGuid);

}

export default generateGuidInteger;