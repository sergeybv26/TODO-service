import React from "react";
import {Link} from "react-router-dom";


const TodoItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td>
                {item.uid}
            </td>
            <td>
                {item.project}
            </td>
            <td>
                {item.author}
            </td>
            <td>
                {item.text}
            </td>
            <td>
                {item.createdAt}
            </td>
            <td>
                {item.isActive}
            </td>
            <td>
                <button type='button' className="btn btn-danger" onClick={() => deleteTodo(item.uid)}>Удалить</button>
            </td>
        </tr>
    )
}

const TodoList = ({items, deleteTodo}) => {
    return (
        <div>
            <table>
                <th>
                    ID
                </th>
                <th>
                    Project name
                </th>
                <th>
                    Author
                </th>
                <th>
                    Text
                </th>
                <th>
                    Created At
                </th>
                <th>
                    Is Active
                </th>
                {items.map((item) => <TodoItem item={item} deleteTodo={deleteTodo} />)}
            </table>
            <Link to='/todo/create' className="menu_button">Создать</Link>
        </div>
    )
}

export default TodoList