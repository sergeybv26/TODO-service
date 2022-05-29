import React from "react";


const TodoItem = ({item}) => {
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
        </tr>
    )
}

const TodoList = ({items}) => {
    return (
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
            {items.map((item) => <TodoItem item={item} />)}
        </table>
    )
}

export default TodoList