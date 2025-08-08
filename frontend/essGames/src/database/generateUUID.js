export function generateUUID(){
    const uuid = window.api.generateUUID();
    console.log(`Generated UUID: ${uuid}`);
    return uuid;
}

export default generateUUID;