import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    SelectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    const taskId = Math.random();
    setProjectState((prevState) => {
      const newTask = {
        text: text,
        projectId: prevState.SelectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

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
    <SelectedProject
      tasks={projectState.tasks}
      onDelete={handleDeleteProject}
      project={selectedProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
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
        selectedProjectId={projectState.SelectedProjectId}
      />

      {content}
    </main>
  );
}

export default App;
