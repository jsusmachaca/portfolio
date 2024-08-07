import '/public/styles/projects.css'
import type { ProjectItemProps } from '../../types/ProjectItem'

const ProjectItem = ({ index, name, description, html_url, homepage, language, icon, stargazers_count, forks }: ProjectItemProps) => {

  return (
    <div id="card" key={index}>
      <div id="title-container">
        <h3 id="card-text-title">{ name }</h3>
      </div>
      <div id="overlay">
        <p id="card-text">
          <span className="sign">&lt;<span className="sign-label">p</span>&gt;</span><br/>
            { description }
          <br /><span className="sign">&lt;/<span className="sign-label">p</span>&gt;</span>
        </p>
        
        <span className="icon-container"><span className="language-icon">{ icon }</span>{ language }</span>
        <span className="icon-container"><span className="star-icon"></span>{ stargazers_count }</span>
        <span className="icon-container"><span className="fork-icon"></span>{ forks }</span>

        { homepage &&(
          <a className="urls-button" href={ homepage } target='_blank'><span className="urls-icon">󰖟 </span>Website</a>
        )}
        <a className="urls-button" href={ html_url } target='_blank'><span className="urls-icon">󰊤 </span>Github Code</a>
      </div>
    </div>
  )
}

export default ProjectItem