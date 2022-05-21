import React from "react";


const ProjectItem = ({item}) => {
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
        </tr>
    )
}

const ProjectList = ({items}) => {
    return (
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
            {items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default ProjectList