import React, { useState, useEffect } from "react"
import ProjectItem from "./ProjectItem"

interface GithubResponse {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  description: string
  html_url: string
  homepage: string
  language: string
  icon: string
  stargazers_count: number
  forks: number
}

const API_KEY = import.meta.env.API_KEY

const ProjectContainer = () => {
  const [projects, setProjects] = useState<GithubResponse[]>([])

  const getIcon = (language: string) => {
    if (!language) return ''
    switch (language) {
      case 'JavaScript':
        return '󰌞'
      case 'TypeScript':
        return '󰛦'
      case 'Python':
        return ''
      case 'Astro':
        return ''
      case 'HTML':
        return ''
      case 'PHP':
        return ''
      case 'Kotlin':
        return ''
      case 'C':
        return ''
      case 'Java':
        return ''
      case 'Shell':
        return '󱆃'
      default:
        return ''
    }
  }

  useEffect(() => {
    fetch('https://api.github.com/user/repos?visibility=public&direction=desc&sort=pushed&affiliation=owner', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `Bearer ${API_KEY}`
      }
    })
      .then (res => {
        console.log('bro?')
        console.log(res)
        return res.json()
      })
      .then (json => {
        const filteredProjects = json.filter((project: GithubResponse) => project.language)
        const projectsWithIcons = filteredProjects.map((project: GithubResponse) => ({
            ...project,
            icon: getIcon(project.language)
          }))
          setProjects(projectsWithIcons)
        })
      .catch (err => console.error(err))
  }, [])

  return (
    <article id="project-container">
      { projects.map((item, index) => (
          <ProjectItem 
            index={index} 
            description={item.description} 
            name={item.name} 
            html_url={item.html_url} 
            language={item.language} 
            icon={item.icon} 
            homepage={item.homepage}
            stargazers_count={item.stargazers_count} 
            forks={item.forks}
          />
        ))
      }
    </article>
  )
}


export default ProjectContainer