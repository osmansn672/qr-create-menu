const { useState } = require("react")

const initialData = {
    "firstName": "",
    "lastName": "",
    "phoneNumber": "",
    "email": "",
    "companyName": "",
    "companyAddress": "",
    "companyWebsite": ""

}


const useGetData = () => {
    const [inputData, setInputData] = useState(initialData)

    const setValue = (name, value) => {
        setInputData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    localStorage.setItem('inputData', JSON.stringify(inputData));


    return {
        inputData,
        setValue
    }

}

export default useGetData