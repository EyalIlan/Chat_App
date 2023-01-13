

export const checkStringSize = (text:string,sizeOfText:number) =>{

    let returnText = text

    if(text.length > sizeOfText){
        returnText =  text.substring(0,sizeOfText) 
    }

    return returnText

}