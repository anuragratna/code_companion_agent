import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from agent.graph import agent
import uvicorn

app = FastAPI(title="Coder Companion API")

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

class BuildRequest(BaseModel):
    prompt: str

@app.get("/")
async def read_root():
    return {"message": "Coder Companion API is running. Access the UI at /static/index.html"}

@app.post("/api/build")
async def build_project(request: BuildRequest):
    try:
        # Run the agent graph
        result = agent.invoke(
            {"user_prompt": request.prompt},
            {"recursion_limit": 100}
        )
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
