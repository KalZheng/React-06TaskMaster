import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    SelectedProjectId: undefined,
    projects: [],
  });

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        SelectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        SelectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    const newId = Math.random();
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: newId,
      };
      return {
        ...prevState,
        SelectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        SelectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.SelectedProjectId
        ),
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        SelectedProjectId: undefined,
      };
    });
  }

  let selectedProject = projectState.projects.find(
    (project) => project.id === projectState.SelectedProjectId
  );

  let content = (
    <SelectedProject onDelete={handleDeleteProject} project={selectedProject} />
  );

  if (projectState.SelectedProjectId === null) {
    content = (
      <NewProject onCancel={handleCancelAddProject} onAdd={handleAddProject} />
    );
  } else if (projectState.SelectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        onStartAddProject={handleStartAddProject}
      />

      {content}
    </main>
  );
}

export default App;
