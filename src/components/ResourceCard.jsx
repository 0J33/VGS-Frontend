import "../css/resource-card.css";

export default function ResourceCard({resource_name, resource_type, resource_link}) {
    return (
        <div className="card" style={{width:"500px",boxSizing:"border-box", padding:"5px 30px", backgroundColor:"#111111"}}>
            <h1 className="heading-text" style={{color:"white"}}>{resource_name}</h1>
            <p className="paragraph-text" style={{color:"white"}}>{resource_type}</p>
            <a className="description-text" style={{color: "#33B4C1", textDecoration:"None"}} href={resource_link}>DOWNLOAD</a>
            <br></br>
        </div>
    )
}