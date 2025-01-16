import axios from "axios";

export default class UserService {
    apiUrl = "http://localhost:5000/users"

    getallUsers() {
        return axios.get(this.apiUrl)
    }

    getUserById(id) {
        return axios.get(this.apiUrl + "?id=" + id)
    }

    borrowBookToUser(data) {
        return axios.post(this.apiUrl + "/borrow", data)
    }

    returnBook(data) {
        return axios.post(this.apiUrl + "/return", data)
    }
}