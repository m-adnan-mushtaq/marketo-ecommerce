import { useState } from "react"

const validityInfo={
    name:{
        required:true,
        min:3,
        pattern:/^[A-Za-z\s]*$/
    },
    password:{
        min:6,
        required:true,
    },
    email:{
        required:true,
        pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
}
/**
 * function to handle input validation with regex expression
 */
export default function useValidation(defaultValue='') {
    const [input, setInput] = useState(defaultValue)
    const [isValid, setIsValid] = useState(true)
    const inputChangeHanlder = e => {
        const {name,value} = e.target
        setInput(value)
        let isInputValid=validityChecker(name,value)
        setIsValid(isInputValid)
    }


    //check validity  info
    function validityChecker(type,val) {
        val=val.trim()
        let targetType=validityInfo[type]
        let isvalid=true
        if(targetType.required) {
            isvalid=val.length && isvalid
        }
        if(targetType.pattern){
            isvalid=targetType.pattern.test(val) && isvalid
        }
        if(targetType.min){
            isvalid=val.length >= targetType.min && isvalid
        }
        return isvalid
    }
    return [input,inputChangeHanlder, isValid]

}