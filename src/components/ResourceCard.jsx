import "../css/resource-card.css";

export default function ResourceCard({resource_name, resource_type, resource_link}) {
    return (
        <div className="card">
            <h1 style={{color:"white"}}>{resource_name}</h1>
            <p style={{color:"white"}}>{resource_type}</p>
            <a href={resource_link}>download</a>
        </div>
    )
}