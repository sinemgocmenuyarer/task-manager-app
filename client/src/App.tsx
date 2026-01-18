import { ProjectSidebar } from "./components/ProjectSidebar";
import { ProjectContextProvider } from "./store/context";
import { ComponentCheck } from "./components/ComponentCheck";
import "./App.css";

function App() {
  return (
    <ProjectContextProvider>
      <main className="app">
        <ProjectSidebar />
        <ComponentCheck />
      </main>
    </ProjectContextProvider>
  );
}

export default App;
