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
            'username': ''
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
        axios.post('http://127.0.0.1:8000/api/token/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['access'])
                this.setState({'username': username})
            }).catch(error => alert('Неверный логин или пароль'))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todo = response.data.results
                this.setState(
                    {
                        'todo': todo
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        console.log(this.state)
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
                            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}/>}/>
                            <Route exact path='/todo' component={() => <TodoList items={this.state.todo}/>}/>
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
