const API_URL = "https://ai-project-backend-thd8.onrender.com";

async function generateAI() {

    const prompt =
        document.getElementById("prompt").value;

    const resultDiv =
        document.getElementById("result");

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
                    authorization:
                        localStorage.getItem("token")
                },

                body: JSON.stringify({
                    prompt
                })
            }
        );

        const data = await response.json();

        resultDiv.innerHTML = `

        <div class="projectCard">

            <h2>🚀 ${prompt}</h2>

            <p>${data.response}</p>

        </div>

        `;

        loadProjects();

    } catch (error) {

        resultDiv.innerHTML = `

        <div class="projectCard">

            <h2>❌ AI Generation Failed</h2>

            <p>Please try again later.</p>

        </div>

        `;

        console.log(error);
    }
}

async function loadProjects() {

    try {

        const response = await fetch(

            `${API_URL}/api/projects`,

            {
                headers: {

                    authorization:
                        localStorage.getItem("token")
                }
            }
        );

        const projects =
            await response.json();

        const savedProjects =
            document.getElementById(
                "savedProjects"
            );

        savedProjects.innerHTML = "";

        projects.reverse().forEach((project) => {

            savedProjects.innerHTML += `

            <div class="projectCard">

                <h2>
                    🚀 ${project.title}
                </h2>

                <p>
                    ${project.generatedConfig.aiResponse}
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

    document.getElementById("authModal")
        .style.display = "flex";

    document.getElementById("authTitle")
        .innerText = "Login";
}

function showSignup() {

    authMode = "signup";

    document.getElementById("authModal")
        .style.display = "flex";

    document.getElementById("authTitle")
        .innerText = "Signup";
}

function closeModal() {

    document.getElementById("authModal")
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

        const data = await response.json();

        localStorage.setItem(
            "token",
            data.token
        );

        alert("Authentication Successful 🚀");

        closeModal();

        loadProjects();

    } catch (error) {

        console.log(error);

        alert("Authentication Failed");
    }
}

async function loginUser() {

    try {

        const response = await fetch(

            `${API_URL}/api/auth/login`,

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: "akash@gmail.com",

                    password: "123456"

                })
            }
        );

        const data = await response.json();

        localStorage.setItem(
            "token",
            data.token
        );

        console.log("Login Success");

    } catch (error) {

        console.log(error);
    }
}

loginUser();

function scrollToGenerator() {

    document
        .querySelector(".generatorSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}

loadProjects();
function showLogin() {

    document.getElementById("loginModal").style.display = "flex";

}

function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

}
