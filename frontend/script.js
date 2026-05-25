git add.
git commit - m "final saved project fix"
git push origin mainconst API_URL = "https://ai-project-backend-thd8.onrender.com";

async function generateAI() {

    const prompt =
        document.getElementById("prompt").value;

    const resultDiv =
        document.getElementById("result");

    const token =
        localStorage.getItem("token");

    if (!token) {

        alert("Please login first");

        showLogin();

        return;
    }

    resultDiv.innerHTML = `

    <div class="projectCard">

        <h2>⏳ Generating AI Project...</h2>

        <p>Please wait while AI creates your project.</p>

    </div>

    `;

    try {

        const response = await fetch(

            `${API_URL}/api/ai/chat`,

            {
                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    authorization: token
                },

                body: JSON.stringify({
                    prompt
                })
            }
        );

        const data = await response.json();

        console.log(data);

        resultDiv.innerHTML = `

        <div class="projectCard">

            <h2>🚀 ${prompt}</h2>

            <p>${data.response || "AI Generated Successfully"}</p>

        </div>

        `;

        loadProjects();

    } catch (error) {

        console.log(error);

        resultDiv.innerHTML = `

        <div class="projectCard">

            <h2>❌ AI Generation Failed</h2>

            <p>Please try again later.</p>

        </div>

        `;
    }
}

async function loadProjects() {

    try {

        const token =
            localStorage.getItem("token");

        if (!token) {

            console.log("No token found");

            return;
        }

        const response = await fetch(

            `${API_URL}/api/projects`,

            {
                method: "GET",

                headers: {
                    authorization: token
                }
            }
        );

        const data =
            await response.json();

        console.log("PROJECT DATA:", data);

        const projects =
            data.projects || [];

        const savedProjects =
            document.getElementById(
                "savedProjects"
            );

        savedProjects.innerHTML = "";

        if (!Array.isArray(projects)) {

            savedProjects.innerHTML = `

            <div class="projectCard">

                <h2>❌ Project Fetch Error</h2>

            </div>

            `;

            return;
        }

        if (projects.length === 0) {

            savedProjects.innerHTML = `

            <div class="projectCard">

                <h2>No Saved Projects Yet 📁</h2>

            </div>

            `;

            return;
        }

        projects.forEach((project) => {

            savedProjects.innerHTML += `

            <div class="projectCard">

                <h2>
                    🚀 ${project.title || "Untitled"}
                </h2>

                <p>
                    ${project.generatedConfig?.aiResponse || "No AI Response"}
                </p>

            </div>

            `;
        });

    } catch (error) {

        console.log(error);

    }
}

let authMode = "login";

function showLogin() {

    authMode = "login";

    document.getElementById("loginModal")
        .style.display = "flex";
}

function showSignup() {

    authMode = "signup";

    document.getElementById("loginModal")
        .style.display = "flex";
}

function closeLogin() {

    document.getElementById("loginModal")
        .style.display = "none";
}

async function submitAuth() {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    let url = "";

    let bodyData = {};

    if (authMode === "signup") {

        url =
            `${API_URL}/api/auth/signup`;

        bodyData = {
            name,
            email,
            password
        };

    } else {

        url =
            `${API_URL}/api/auth/login`;

        bodyData = {
            email,
            password
        };
    }

    try {

        const response = await fetch(

            url,

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(bodyData)
            }
        );

        const data =
            await response.json();

        console.log(data);

        if (!data.token) {

            alert(
                data.message ||
                "Authentication Failed"
            );

            return;
        }

        localStorage.setItem(
            "token",
            data.token
        );

        alert("Authentication Successful 🚀");

        closeLogin();

        loadProjects();

    } catch (error) {

        console.log(error);

        alert("Authentication Failed");
    }
}

function scrollToGenerator() {

    document
        .querySelector(".generatorBox")
        .scrollIntoView({
            behavior: "smooth"
        });
}

window.onload = () => {

    loadProjects();
};