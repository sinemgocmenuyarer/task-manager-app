import { ProjectSidebar } from "./components/ProjectSidebar";
import { ProjectContextProvider } from "./store/context";
import { ComponentCheck } from "./components/ComponentCheck";
import "./App.css";

function App() {
  // const [userPrompt, setUserPrompt] = useState<string>("");

  // // TODO: Handle this logic in a seperate file to keep the App tsx clean.
  // const handlePromptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const response = await generateResponse();
  //   console.log("response:", response);
  // };

  // const generateResponse = async () => {
  //   const response = await fetch("http://localhost:3005/generate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ prompt: userPrompt }),
  //   });

  //   const data = await response.json();
  //   return data;
  // };

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

{
  /* <div className="content">
          <form onSubmit={handlePromptSubmit}>
            <input
              type="text"
              name="promt-description"
              placeholder="Enter a prompt"
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <input type="submit" value="Generate your task" />
          </form>
        </div> */
}
