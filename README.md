# Code companion 🤖

**Code companion** is a multi-agent AI system designed to automate the process of planning, architecting, and implementing software projects from simple natural language prompts. Built with **LangGraph** and **OpenAI**, it orchestrates three specialized agents to build functional codebases.

## 🏗️ Architecture

The system uses a graph-based workflow (via LangGraph) to coordinate three primary agents:

1.  **Planner Agent**: Analyzes the user's request and creates a high-level engineering project plan, defining the tech stack, features, and file structure.
2.  **Architect Agent**: Takes the project plan and breaks it down into explicit, ordered engineering tasks. It ensures that files are implemented in the correct order of dependency.
3.  **Coder Agent**: A tool-using agent (ReAct) that implements each task by reading and writing files to the disk. It maintains context across steps to ensure consistent implementation.

## 🛠️ Tech Stack

-   **Framework**: [LangGraph](https://github.com/langchain-ai/langgraph)
-   **Orchestration**: [LangChain](https://github.com/langchain-ai/langchain)
-   **LLM Provider**: OpenAI (GPT-4o)
-   **Package Manager**: [uv](https://github.com/astral-sh/uv)
-   **Environment**: Python >= 3.11

## Getting Started

### Prerequisites

-   Ensure you have `uv` installed. If not, install it via:
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

### Installation

1.  Sync the project dependencies:
    ```bash
    uv sync
    ```

2.  Create a `.env` file in the root directory and add your OpenAI API key:
    ```env
    OPENAI_API_KEY="your_api_key_here"
    ```

### Usage

Run the main entry point:
```bash
uv run python main.py
```

Follow the prompt to enter your project description (e.g., "Build a landing page for a coffee shop"). The agent will generate the files in the `generated_project/` directory.

## 📁 Project Structure

-   `main.py`: Interactive CLI entry point.
-   `agent/graph.py`: The LangGraph definition orchestration the agents.
-   `agent/states.py`: Pydantic models for structured output and state management.
-   `agent/tools.py`: File-system tools used by the Coder agent.
-   `agent/prompts.py`: System prompts for each agent.
-   `generated_project/`: The directory where the AI-generated code is stored.
