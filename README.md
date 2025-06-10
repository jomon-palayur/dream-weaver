# The Dream Weaver

A collaborative and surreal dream narrative generator web application powered by the Google Gemini API. Start a dream with a single prompt, watch it evolve through AI-generated segments, and guide its direction by choosing from new options.

## ✨ Features

* **Surreal Dream Generation:** AI-powered narrative generation using Google Gemini.
* **Interactive Storytelling:** Users influence the dream's progression by choosing from AI-generated options.
* **Evolving Narrative:** Each choice appends a new segment to the dream, creating unique and often bizarre sequences.
* **Simple & Intuitive UI:** Easy to use for a fun, creative experience.

## 🚀 Live Demo (Optional)


[Link to Live Demo (e.g., https://dream-weaver.vercel.app)]

## 🛠️ Technologies Used

**Backend (Node.js/Express):**
* [Node.js](https://nodejs.org/): JavaScript runtime
* [Express.js](https://expressjs.com/): Web framework for Node.js
* [`@google/generative-ai`](https://www.npmjs.com/package/@google/generative-ai): Google's official client library for the Gemini API
* [`dotenv`](https://www.npmjs.com/package/dotenv): For loading environment variables
* [`cors`](https://www.npmjs.com/package/cors): For handling Cross-Origin Resource Sharing

**Frontend (HTML, CSS, JavaScript):**
* Vanilla HTML: Structure
* Vanilla CSS: Styling
* Vanilla JavaScript: Client-side logic

## ⚙️ Setup and Installation

Follow these steps to get a local copy of the Dream Weaver up and running on your machine.

### Prerequisites

* **Node.js and npm:** [Download and install Node.js](https://nodejs.org/en/download/) (npm is included with Node.js).
* **Google Cloud Project & Gemini API Key:**
    1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
    2.  Create a new Google Cloud Project.
    3.  Navigate to **APIs & Services > Library**.
    4.  Search for and **enable the "Generative Language API"**.
    5.  Go to **APIs & Services > Credentials**.
    6.  Click "CREATE CREDENTIALS" and choose "API Key". Copy this key.
    7.  **Important:** Restrict your API key if you plan to deploy this app, or at least ensure it's linked only to the "Generative Language API." For local development, "Don't restrict key" will work initially.

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/jomon-palayur/dream-weaver.git](https://github.com/jomon-palayur/dream-weaver.git)
    cd dream-weaver
    ```
    

2.  **Set up Backend:**
    * Navigate into the `server` directory:
        ```bash
        cd server
        ```
    * Install backend dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `server` directory and add your Gemini API key:
        ```
        GEMINI_API_KEY="YOUR_YOUR_GEMINI_API_KEY_HERE"
        ```
        **Replace `"YOUR_YOUR_GEMINI_API_KEY_HERE"` with your actual Gemini API key.**

3.  **Run the Backend Server:**
    * While still in the `server` directory, start the server:
        ```bash
        node server.js
        ```
    * You should see `Server running on http://localhost:3000`. Keep this terminal window open.

4.  **Access the Frontend:**
    * Open your web browser.
    * Go to `http://localhost:3000`. (The Node.js server also serves the static frontend files from the `public` directory).

## 🚀 How to Use

1.  **Start a Dream:** Enter a vivid word or short phrase (e.g., "flying through clouds," "a silent, shimmering forest," "talking animals at a tea party") into the input field and click "Start Dream."
2.  **Read and Choose:** The AI will generate the first segment of your dream. Read it, and then select one of the three AI-generated choices to influence the next part of the dream.
3.  **Continue the Journey:** The dream will evolve based on your selections, creating a unique and often bizarre narrative. Keep choosing to see where your subconscious (and Gemini) takes you!
4.  **Start a New Dream:** Click the "Start a New Dream" button to clear the current narrative and begin a fresh, unique dream.

## 💡 Suggestions for Improvement & Further Development

This project is a great starting point! Here are some ideas to expand its functionality and features:

1.  **Enhanced Dream Display:**
    * Visually separate each dream segment (e.g., with distinct backgrounds, borders).
    * Add smooth scrolling to follow the dream's progression automatically.
    * Implement "typewriter" effect for AI-generated text.
2.  **Dream Saving & Sharing:**
    * Allow users to save their favorite dream threads (e.g., using `localStorage` or a simple database like SQLite/MongoDB for a backend).
    * Add a "Share Dream" button that copies the full dream text or generates a unique shareable URL.
3.  **User Authentication:** (More advanced)
    * Implement user accounts to manage saved dreams across devices.
4.  **Image Generation (Multimodal):**
    * Integrate a text-to-image API (e.g., DALL-E, Midjourney, Stability AI, or potentially future Gemini Vision capabilities) to generate an abstract image after each dream segment, visualizing the narrative.
5.  **Soundscapes:**
    * Generate ambient sounds or background music that subtly changes based on the tone or keywords in the dream segments.
6.  **"Dream Analysis" (Basic):**
    * After a dream is complete, use Gemini to offer a *very* lighthearted "analysis" or highlight recurring themes.
7.  **More Sophisticated Choices:**
    * Experiment with generating more nuanced or emotionally driven choices.
8.  **Loading Indicators & Error Messages:**
    * Improve the user feedback during API calls (more specific loading messages, friendly error messages).
9.  **Deployment:**
    * Deploy the full-stack application to a cloud platform like Render, Heroku, Vercel (for frontend) + Render (for backend), or Google Cloud Run for public access.
10. **Testing:**
    * Add unit tests for backend API routes and frontend logic.
11. **Responsive Design:**
    * Further refine the CSS for a more seamless experience on various screen sizes.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve the Dream Weaver, please fork the repository and submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

---
_Made with love and dreams by John Babu K
