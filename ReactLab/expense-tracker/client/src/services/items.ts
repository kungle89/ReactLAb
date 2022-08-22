
import axios from "axios";
import DataList from "../models/IItem";

const getDataFromServer = () => {
    return axios.get<DataList[]>(`http://localhost:4000/items`)
        .then(response => response.data);
}

const pushDataFromUser = (formData: Omit<DataList, "id">) => {
    return axios.post<DataList>(`http://localhost:4000/items`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

export { getDataFromServer, pushDataFromUser }