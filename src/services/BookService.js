import axios from "axios";

export default class BookService {
    apiUrl = "http://localhost:5000/books"

    getallBooks() {
        return axios.get(this.apiUrl)
    }

    getBookById(id) {
        return axios.get(this.apiUrl + "?id=" + id)
    }
}