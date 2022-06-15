import React from "react";
import axios from "axios";
import './App.css';
import UserList from "./components/Users";
import Footer from "./components/Footer";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie/es6";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todo";
import LoginForm from "./components/Auth";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import SearchForm from "./components/SearchForm";


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу `{location.pathname}` не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token': '',
            'username': '',
            'filteredProjects': []
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Bearer ' + this.state.token
        }
        return headers
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
        this.setState({'username': ''})
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://176.99.11.31:8000/api/token/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['access'])
                this.setState({'username': username})
            }).catch(error => alert('Неверный логин или пароль'))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://176.99.11.31:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://176.99.11.31:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://176.99.11.31:8000/api/todo/', {headers})
            .then(response => {
                const todo = response.data.results
                this.setState(
                    {
                        'todo': todo
                    }
                )
            }).catch(error => console.log(error))
    }

    createProject(name, gitUrl, authors) {
        const headers = this.get_headers()
        const data = {name: name, gitUrl: gitUrl, authors: [authors]}
        axios.post('http://176.99.11.31:8000/api/projects/', data, {headers})
            .then(response => {
                let newProject = response.data
                const authors = this.state.users.filter((item) => item.username === newProject.authors[0])[0]
                newProject.authors = authors.username
                this.setState({'projects': [...this.state.projects, newProject]})
            }).catch(error => console.log(error))
    }

    createTodo(project, author, text, isActive) {
        const headers = this.get_headers()
        const data = {project: project, author: author, text: text, isActive: isActive}
        axios.post('http://176.99.11.31:8000/api/todo/', data, {headers})
            .then(response => {
                let newTodo = response.data
                const project = this.state.projects.filter((item) => item.name === newTodo.project)[0]
                newTodo.project = project.name
                const author = this.state.users.filter((item) => item.username === newTodo.author)[0]
                newTodo.author = author.username
                this.setState({'todo': [...this.state.todo, newTodo]})
            }).catch(error => console.log(error))
    }

    deleteProject(uid) {
        const headers = this.get_headers()
        axios.delete(`http://176.99.11.31:8000/api/projects/${uid}`, {headers})
            .then(response => {
                this.setState({'projects': this.state.projects.filter((item) => item.uid !== uid)})
            }).catch(error => console.log(error))
    }

    deleteTodo(uid) {
        const headers = this.get_headers()
        axios.delete(`http://176.99.11.31:8000/api/todo/${uid}`, {headers})
            .then(response => {
                this.setState({'todo': this.state.todo.filter((item) => item.uid !== uid)})
            }).catch(error => console.log(error))
    }

    searchProject(name) {
        const headers = this.get_headers()
        axios.get(`http://176.99.11.31:8000/api/projects/?name=${name}`, {headers})
            .then(response => {
                const filteredProjects = response.data.results
                this.setState({'filteredProjects': filteredProjects})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <section>
                <div className="App">
                    <BrowserRouter>
                        <nav>
                            <ul className="menu">
                                <li>
                                    <Link className="menu_button" to="/">Пользователи</Link>
                                </li>
                                <li>
                                    <Link className="menu_button" to='/projects'>Проекты</Link>
                                </li>
                                <li>
                                    <Link className="menu_button" to='/projects/search'>Найти проекты</Link>
                                </li>
                                <li>
                                    <Link className="menu_button" to='/todo'>Заметки</Link>
                                </li>
                                <li>
                                    {this.is_authenticated() ? <button className="menu_button" onClick={() => this.logout()}>Выйти</button> :
                                    <Link className="menu_button" to='/login'>Войти</Link>}
                                </li>
                                <li>
                                    {this.is_authenticated() ? <p>Пользователь: {this.state.username}</p> :
                                        <p></p>}
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path="/" component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/project/create' component={ () => <ProjectForm authors={this.state.users}
                                    createProject={(name, gitUrl, authors) => this.createProject(name, gitUrl, authors)} /> } />
                            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}
                            deleteProject={(uid) => this.deleteProject(uid)} />}/>
                            <Route exact path='/projects/search' component={() => <SearchForm items={this.state.filteredProjects}
                                searchProject={(name) => this.searchProject(name)} deleteProject={(uid) => this.deleteProject(uid)} />} />
                            <Route exact path='/todo/create' component={ () => <TodoForm project={this.state.projects} author={this.state.users}
                               createTodo={(project, author, text, isActive) => this.createTodo(project, author, text, isActive)} />} />
                            <Route exact path='/todo' component={() => <TodoList items={this.state.todo}
                            deleteTodo={(uid) => this.deleteTodo(uid)} />}/>
                            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                            <Route component={NotFound404} />
                        </Switch>
                    </BrowserRouter>
                </div>
                <Footer/>
            </section>
        )
    }
}

export default App;
