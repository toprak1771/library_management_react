import axios from "axios";

export default class UserService {
    apiUrl = "http://localhost:5000/users"

    getallUsers() {
        return axios.get(this.apiUrl)
    }

    borrowBookToUser(data) {
        return axios.post(this.apiUrl + "/borrow", data)
    }
}