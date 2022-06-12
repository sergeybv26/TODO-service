import React from "react"
import ProjectList from "./Projects";


class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    handleSubmit(event) {
        this.props.searchProject(this.state.name)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={ (event) => this.handleSubmit(event) }>
                    <div className="form-group">
                        <label htmlFor="name">Наименование проекта</label>
                        <input type="text" className="form-control" name="name" value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Найти" />
                </form>
                <ProjectList items={this.props.items}
                                deleteProject={(uid) => this.props.deleteProject(uid)} />
            </div>
        )
    }
}


export default SearchForm
