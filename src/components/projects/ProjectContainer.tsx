import React, { useState, useEffect } from "react"
import ProjectItem from "./ProjectItem"
import axios from "axios"
import type { GithubResponse } from "../../types/GithubResponse"

const API_KEY = import.meta.env.PUBLIC_API_KEY

const ProjectContainer = () => {
  const [projects, setProjects] = useState<GithubResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      case 'Go':
        return ''
      case 'C#':
        return ''
      case 'Shell':
        return '󱆃'
      default:
        return ''
    }
  }

  const fetchProjectData = async () => {
    try {
      const response = await axios.get('https://api.github.com/user/repos?visibility=public&direction=desc&sort=pushed&affiliation=owner', {
        headers: {
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Authorization': `Bearer ${API_KEY}`
        }
      })
      const filteredProjects = response.data.filter((project: GithubResponse) => project.language)
      const projectsWithIcons = filteredProjects.map((project: GithubResponse) => ({
        ...project,
        icon: getIcon(project.language)
      }))
      setProjects(projectsWithIcons)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchProjectData()
  }, [])

  return (
    <article id="project-container">
      { isLoading ?
          <h1 id="load-text">Querying Github repositories ...</h1>
        :
          projects.map((item, index) => (
            <ProjectItem 
              key={index}
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