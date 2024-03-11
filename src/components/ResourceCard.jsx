import "../css/resource-card.css";

export default function ResourceCard({resource_title, resource_name, resource_link}) {

    return (
        <div className="card" style={{boxSizing:"border-box", padding:"5px 30px", backgroundColor:"#111111"}}>
            <h1 className="header-text" style={{color:"white", fontSize:"25px", marginTop:"15px", fontWeight:"600"}}>{resource_title}</h1>
            <p className="paragraph-text" style={{color:"grey"}}>{resource_name}</p>
            <a style={{color: "white", textDecoration:"None"}} href={resource_link}><button className="btn-cms"><a className="description-text" style={{color: "white", textDecoration:"None"}}>DOWNLOAD</a></button></a>
            <br></br>
        </div>
    )
}