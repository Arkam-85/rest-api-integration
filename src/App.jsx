import { useState } from "react";
import "./App.css";

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPosts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts?_limit=6"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();

            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">

            <header>
                <h1>REST API Explorer</h1>
                <p>
                    Fetching and displaying JSON data
                    using a REST API
                </p>
            </header>

            <main>

                <button onClick={fetchPosts}>
                    Fetch Posts
                </button>

                {loading && (
                    <p className="message">
                        Loading data...
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <div className="post-grid">

                    {posts.map((post) => (

                        <article
                            className="post-card"
                            key={post.id}
                        >

                            <h2>
                                {post.title}
                            </h2>

                            <p>
                                {post.body}
                            </p>

                            <span>
                                Post ID: {post.id}
                            </span>

                        </article>

                    ))}

                </div>

            </main>

            <footer>
                <p>
                    Data provided by JSONPlaceholder
                </p>
            </footer>

        </div>
    );
}

export default App;