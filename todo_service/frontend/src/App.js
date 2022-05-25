import React from "react";
import axios from "axios";
import './App.css';
import UserList from "./components/Users";
import Footer from "./components/Footer";
import {BrowserRouter, HashRouter, Link, Route, Switch} from "react-router-dom";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todo";


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
            'todo': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todo = response.data.results
                this.setState(
                    {
                        'todo': todo
                    }
                )
            }).catch(error => console.log(error))
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
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path="/" component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}/>}/>
                            <Route exact path='/todo' component={() => <TodoList items={this.state.todo}/>}/>
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
