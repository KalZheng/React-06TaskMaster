import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";

function App() {
  const [projectState, setProjectState] = useState({
    SelectedProjectId: undefined,
    projects: [],
  });

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

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        SelectedProjectId: undefined,
      };
    });
  }

  let content;

  if (projectState.SelectedProjectId === null) {
    content = <NewProject onCancel={handleCancelAddProject} onAdd={handleAddProject} />;
  } else if (projectState.SelectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        projects={projectState.projects}
        onStartAddProject={handleStartAddProject}
      />

      {content}
    </main>
  );
}

export default App;
