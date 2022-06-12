import React from "react"


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', gitUrl: '', authors: props.authors[0]?.uid}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.gitUrl, this.state.authors)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={ (event) => this.handleSubmit(event) }>
                <div className="form-group">
                    <label for="name">Наименование</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={ (event) => this.handleChange(event) } />
                </div>
                <div className="form-group">
                    <label htmlFor="gitUrl">Ссылка на GIT</label>
                    <input type="text" className="form-control" name="gitUrl" value={this.state.gitUrl}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="authors">Автор</label>
                    <select className="form-control" name="authors"
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.authors.map((item) => <option value={item.username}>{item.username}</option>) }
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Сохранить" />
            </form>
        )
    }

}

export default ProjectForm
