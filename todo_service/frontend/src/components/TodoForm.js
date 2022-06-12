import React from "react"


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project: props.project[0]?.uid, author: props.author[0]?.uid, text: '', isActive: true}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.project, this.state.author, this.state.text, this.state.isActive)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={ (event) => this.handleSubmit(event) }>
                <div className="form-group">
                    <label for='project'>Проект</label>
                    <select className='form-control' name='project'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.project.map((item) => <option value={item.name}>{item.name}</option> )}
                    </select>
                </div>
                <div className="form-group">
                    <label for='author'>Автор</label>
                    <select className='form-control' name='author'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.author.map((item) => <option value={item.username}>{item.username}</option> )}
                    </select>
                </div>
                <div className="form-group">
                    <label for='text'>Текст</label>
                    <input type='text' className='form-control' name='text' value={this.state.text} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for='isActive'>Активно</label>
                    <input type='checkbox' className='form-control' name='isActive' value={this.state.isActive} checked onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type='submit' className='btn btn-primary' value='Сохранить'/>
            </form>
        )
    }
}

export default TodoForm
