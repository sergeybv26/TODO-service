import React from "react"
import {Link} from "react-router-dom"


const ProjectItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td>
                {item.uid}
            </td>
            <td>
                {item.name}
            </td>
            <td>
                {item.authors}
            </td>
            <td>
                {item.gitUrl}
            </td>
            <td>
                <button type='button' className="btn btn-danger" onClick={() => deleteProject(item.uid)}>Удалить</button>
            </td>
        </tr>
    )
}

const ProjectList = ({items, deleteProject}) => {
    return (
        <div>
            <table>
                <th>
                    ID
                </th>
                <th>
                    Name
                </th>
                <th>
                    Authors
                </th>
                <th>
                    GitURL
                </th>
                {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
            </table>
            <Link to='/project/create' className="menu_button">Создать</Link>
        </div>
    )
}

export default ProjectList