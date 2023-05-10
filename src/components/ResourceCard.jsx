import "../css/resource-card.css";

export default function ResourceCard({resource_name, resource_type, resource_link}) {
    return (
        <div className="card" style={{width:"750px",boxSizing:"border-box", padding:"5px 30px", backgroundColor:"#111111"}}>
            <h1 className="header-text" style={{color:"white", fontSize:"25px", marginTop:"15px", fontWeight:"600"}}>{resource_name}</h1>
            <p className="paragraph-text" style={{color:"grey"}}>{resource_type}</p>
            <button className="btn-cms"><a className="description-text" style={{color: "white", textDecoration:"None"}} href={resource_link}>DOWNLOAD</a></button>
            <br></br>
        </div>
    )
}